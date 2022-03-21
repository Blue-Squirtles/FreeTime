const path = require('path');
const express = require('express');
const controller = require('./controller/controller');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
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
