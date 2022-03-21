const model = require('../model/model');

module.exports = {
  getActivities: (req, res) => {
    // create paramater to get by email instead of user_id
    model.getActivities((error, results) => {
      if (error) {
        console.log('controller error', error);
        res.sendStatus(500);
      } else {
        console.log(results);
        res.send(results.rows);
      }
    });
  },

  import: async (req, res) => {
    // make db query to get users access token
    // const accessToken = await model.getToken
    // use axios to make post request to google endpoint for google free/busy object
    //

  },

  // adds an activity from our app to database:

  addActivity: async (req, res) => {
    // req.body also needs list of attendees by user_id
    // req.body.creater = create_user_id
    const activity = [
      req.body.create_user_id,
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
        const creator = [activityID, req.body.create_user_id, true, true];
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

  addUser: (emailString, accessString, refreshString) => {
    const params = [emailString, accessString, refreshString];
    model.addUser(params, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        // res.redirect('/');
      }
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
