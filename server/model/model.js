const db = require('../database');

module.exports = {
  // 'select name, description, start_time, end_time from activities where activity_id in (select activity_id from attendees where email = $1)'
  getActivities: (email, callback) => {
    const query = 'select a.name, a.description, a.start, a.end, json_agg(d.email) as attendees from activities a left join attendees d on a.activity_id = d.activity_id where d.activity_id in (select d.activity_id from attendees where email = $1) group by a.activity_id';
    db.query(query, email, (error, results) => {
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

  getFriends: (email, callback) => {
    const query = 'select * from users where email != $1';
    db.query(query, email, (error, results) => {
      callback(error, results);
    });
  },

  getTokens: (email) => {
    return new Promise((resolve, reject) => {
      const query = 'select access_token, refresh_token from users where email = $1';
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
      const query = 'insert into activities(create_user_id, name, description, start, "end") VALUES ($1, $2, $3, $4, $5) RETURNING activity_id';
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
      const query = 'insert into attendees(activity_id, user_id, email, accepted, creator) VALUES ($1, $2, $3, $4, $5)';
      db.query(query, attendee, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },

  addUser: (params, callback) => {
    const query = 'insert into users(email, access_token, refresh_token) VALUES ($1, $2, $3) on conflict (email) do update set access_token = $2, refresh_token = $3';
    db.query(query, params, (err, results) => {
      callback(err, results);
    });
  },

  updateAccessToken: (token, callback) => {
    const query = 'update users set access_token = $1 where email = $2;';
    db.query(query, token, (err, results) => {
      callback(err, results);
    });
  },
};
