DROP DATABASE IF EXISTS freetime;
CREATE DATABASE freetime;
\c freetime;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  access_token VARCHAR(1000),
  refresh_token VARCHAR(1000)
);

CREATE TABLE activities (
  activity_id SERIAL PRIMARY KEY,
  create_user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(100),
  description VARCHAR(1000),
  start_time TIMESTAMP,
  end_time TIMESTAMP
);

CREATE TABLE attendees (
  attendee_id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(activity_id),
  user_id INTEGER REFERENCES users(user_id),
  /* accepted: null = not made a decision, false = not going, true = going */
  accepted BOOLEAN,
  creator BOOLEAN NOT NULL
);
