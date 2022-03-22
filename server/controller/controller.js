const axios = require('axios');
const model = require('../model/model');

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
    const email = [req.query.email];
    const results = await model.getTokens(email);
    const { access_token, refresh_token } = results.rows[0];

    // axios.post('https://www.googleapis.com/calendar/v3/freeBusy?key=${API_Key}',
    // )
    //   .then

    // use axios to make post request to google endpoint for google free/busy object
    // try google query with access token
    // if succeed send
    // if fail use refresh to get new access token
    // redo google api query with new token
  },

  getFriends: (req, res) => {
    const email = [req.query.email];
    model.getFriends(email, (error, results) => {
      if (error) {
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
    const activityID = await model.addActivity(activity, (error, results) => {
      if (error) {
        console.log('post error', error);
        res.sendStatus(500);
      } else {
        const creator = [activityID, creatorID, req.body.email, true, true];
        model.addAttendee(creator, (createError, results) => {
          if (createError) {
            res.sendStatus(500);
          } else {
            const { attendees } = req.body.attendees;
            for (let i = 0; i < attendees.length; i += 1) {
              const currentAttendee = attendees[i];
              const params = [activityID, currentAttendee.user_id, null, false];
              model.addAttendee(params, (attendeeError, results) => {
                if (attendeeError) {
                  res.sendStatus(500);
                }
              });
            }
          }
        });
        res.sendStatus(200);
      }
    });
  },

  addUser: (user, callback) => {
    model.addUser(user, (error, results) => {
      callback(error, results);
    });
  },
};

// This adds google activities to database. Needed?"

// addGoogleActivities: async (req, res) => {
//   // check on how data comes in
//   const email = [Object.keys(req.body.calendars)[0]];
//   const userID = await model.getUserId(email);
//   const schedule = req.body.calendars[email].busy;

//   for (let i = 0; i < schedule.length; i += 1) {
//     const activity = [userID, null, null, schedule[i].start, schedule[i].end, true, false];
//     model.addActivity(activity, (error, results) => {
//       if (error) {
//         console.log('post error', error);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(200);
//       }
//     });
//   }
// },


//  // add activity and get resulting activity id
//  const activityResult = await model.addActivity(activity);
//  const activityID = activityResult.rows[0].activity_id;

//  // add creator of activity to attendees table
//  const creator = [activityID, creatorID, req.body.email, true, true];
//  await model.addAttendee(creator);

//  // add invited friends to attendees table
//  const attendees = req.body.attendees;
// },