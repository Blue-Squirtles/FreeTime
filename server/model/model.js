const db = require('../database');

module.exports = {
  // remove activity id and create_user_id from result
  getActivities: (callback) => {
    const query = 'select * from activities where activity_id in (select activity_id from attendees where user_id = 1)';
    db.query(query, (error, results) => {
      callback(error, results);
    });
  },

  getUserId: (email) => {
    return new Promise((resolve, reject) => {
      const query = 'select user_id from users where email = $1';
      db.query(query, email, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },

  addActivity: (activity) => {
    return new Promise((resolve, reject) => {
      const query = 'insert into activities(create_user_id, name, description, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING activity_id';
      db.query(query, activity, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },

  addAttendee: (attendee) => {
    return new Promise((resolve, reject) => {
      const query = 'insert into attendees(activity_id, user_id, accepted, creator) VALUES ($1, $2, $3, $4)';
      db.query(query, attendee, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },

  addUser: (params, callback) => {
    const query = 'insert into users(email, access_token, refresh_token) VALUES ($1, $2, $3)';
    db.query(query, params, (err, results) => {
      callback(err, results);
    });
  },
};
