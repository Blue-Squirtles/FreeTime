/* eslint-disable camelcase */
const axios = require('axios');
const model = require('../model/model');
const { CLIENT_ID, CLIENT_SECRET, API_KEY } = require('../keys');

module.exports = {
  getActivities: (req, res) => {
    // create paramater to get by email instead of user_id
    const email = [req.query.email];
    model.getActivities(email, (error, results) => {
      if (error) {
        console.log('controller error', error);
        res.sendStatus(500);
      } else {
        res.send(results.rows);
      }
    });
  },

  import: async (req, res) => {
    // make db query to get users access token
    const { email, timeMin, timeMax } = req.query;
    const results = await model.getTokens([email]);
    const { access_token, refresh_token } = results.rows[0];

    axios({
      method: 'post',
      url: 'https://www.googleapis.com/calendar/v3/freeBusy?',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        key: API_KEY,
      },
      data: {
        timeMin,
        timeMax,
        items: [
          {
            id: email,
          },
        ],
      },
    })
      .then((response) => {
        res.status(200).send(response.data.calendars[email].busy);
      })
      .catch((err) => {
        // if error type is 401 refresh token and try again
        if (err.response.status !== 401) {
          res.sendStatus(500);
        } else {
          axios({
            method: 'post',
            url: 'https://www.googleapis.com/oauth2/v4/token',
            params: {
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              refresh_token,
              grant_type: 'refresh_token',
            },
          })
            .then((response) => {
              // save new access token and recall method
              const params = [response.data.access_token, email];
              model.updateAccessToken(params, (error, results) => {
                if (error) {
                  console.log('update token db', error);
                }
              });
              axios({
                method: 'post',
                url: 'https://www.googleapis.com/calendar/v3/freeBusy?',
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                params: {
                  key: API_KEY,
                },
                data: {
                  timeMin,
                  timeMax,
                  items: [
                    {
                      id: email,
                    },
                  ],
                },
              })
                .then((response) => {
                  res.status(200).send(response.data.calendars[email].busy);
                })
                .catch((err) => {
                  res.sendStatus(500);
                });
            });
        }
      });
  },

  getFriends: (req, res) => {
    const email = [req.query.email];
    // console.log('email: ', email);
    model.getFriends(email, (error, results) => {
      if (error) {
        // console.log(error);
        res.sendStatus(500);
      } else {
        res.send(results.rows);
      }
    });
  },

  // adds an activity from our app to database:
  addActivity: async (req, res) => {
    // req.body also needs list of attendees by user_id
    // get user id from email
    const result = await model.getUserId([req.body.email]);
    const creatorID = result.rows[0].user_id;
    const activity = [
      creatorID,
      req.body.name,
      req.body.description,
      req.body.start,
      req.body.end,
    ];
    const activityResult = await model.addActivity(activity, (error, results) => {
      if (error) {
        console.log('post error', error);
        res.sendStatus(500);
      }
    });
    const activityID = activityResult.rows[0].activity_id;
    const creator = [activityID, creatorID, req.body.email, true, true];

    const addCreator = await model.addAttendee(creator, (createError, results) => {
      if (createError) {
        res.sendStatus(500);
      }
    });
    const attendees = req.body.attendees;
    for (let i = 0; i < attendees.length; i += 1) {
      const currentAttendee = attendees[i];
      const params = [activityID, currentAttendee.user_id, currentAttendee.email, null, false];
      model.addAttendee(params, (attendeeError, results) => {
        if (attendeeError) {
          res.sendStatus(500);
        }
      });
    }
    res.sendStatus(200);
  },

  addUser: (user, callback) => {
    model.addUser(user, (error, results) => {
      callback(error, results);
    });
    // res.send('ok')
  },
};