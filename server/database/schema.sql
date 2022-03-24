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
  start TIMESTAMP,
  "end" TIMESTAMP
);

CREATE TABLE attendees (
  attendee_id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(activity_id),
  user_id INTEGER REFERENCES users(user_id),
  email VARCHAR(100) REFERENCES users(email),
  accepted BOOLEAN,
  creator BOOLEAN NOT NULL
);

INSERT INTO users (email, access_token, refresh_token) VALUES ('joe.wagstaff@gmail.com', 'joe access token', 'joe refresh token');
INSERT INTO users (email, access_token, refresh_token) VALUES ('owen.crookston@gmail.com', 'owen access token', 'owen refresh token');
INSERT INTO users (email, access_token, refresh_token) VALUES ('justin.t.greer1@gmail.com', 'ya29.A0ARrdaM_ANTQTRHYFiPAyjqsLAqIptGmNj44j9Gp3vZN5nlRS2lBLy4PnMo1MT4Lh_M1Y3llxdRZf-Ccd0wMIUrlUNiKY-IZA_K2sAtHI4YZlByoz4ORblH5n_tXFwGjnoakKJpKH6tL4ECFmJSgg9-uSS9Ui2A', '1//06l9xIvUikHrCCgYIARAAGAYSNwF-L9Ir8WLwvADwGaxt7L83sbW3vfH5MD_XVC9ggjPLYgdDqL2rdQ5OVcBYf9PpoE9wGYrcPuA');

/* accepted: null = not made a decision, false = not going, true = going */
