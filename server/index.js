const path = require('path');
const { google } = require('googleapis');
const express = require('express');
const cookieParser = require('cookie-parser');
const controller = require('./controller/controller');
const { CLIENT_SECRET, CLIENT_ID } = require('./keys');

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'http://localhost:3000/oauth2callback',
);

const scopes = [
  'https://www.googleapis.com/auth/calendar',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/freetime', express.static(path.join(__dirname, '/../client/dist')));
// app.get('/oauth2callback*', express.static(path.join(__dirname, '/../client/dist')));
app.get('/oauth2callback', async (req, res) => {
  console.log('Received code', req.query.code);

  const { tokens } = await oauth2Client.getToken(req.query.code);

  // Parse and validate JWT to the ID
  // Store token with associated user (based on id)
  console.log(JSON.stringify(req.cookies.jwt, null, '  '));
  console.log('tokens', JSON.stringify(tokens, null, '  '));

  const ticket = await oauth2Client.verifyIdToken({ idToken: req.cookies.jwt });
  const payload = ticket.getPayload();
  const { email } = payload;
  console.log(JSON.stringify(email));

  res.redirect('/freetime');
});

app.get('/login', (req, res) => {
  res.redirect(url);
});

// gets users google calendar
app.get('/freetime/import', controller.import);

// gets a user's activities
app.get('/freetime/activities', controller.getActivities);

// user creates an activity, it gets added to their calender and the invited atteendees calendar
app.post('/freetime/addActivity', controller.addActivity);

// add a new user with their email and google tokens
app.post('/freetime/addUser', controller.addUser);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
