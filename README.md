# Free-Time

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB "React.js")
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white "NodeJS")
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white "Express")
![BootStrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white "Bootstrap")
![StyledComponents](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white "StyledComponents")
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## For best experience, please view this README in the browser

## Descripton
FreeTime is a full-stack application that helps users get better at finding and scheduling events with friends by tracking their schedules simultaneously. The front end displays views created from data in a PostgreSQL database. For the development of this application it was separated into 4 main sections as outlined in the project proposal including a personal calendar in week view, a friends list, friends calendar integration, as well as importing all user data from their own google calendar. Currently the calendar is displaying the users current information imported from their google calendar, and as multiple users are selected their calendar information is joined into the calendar view to highlight the mutually available free time.

This data is pulled live and if anyone adjusts their google calendar it will be reflected in the view.

To accomplish this the programs used include [React](https://reactjs.org) and served the application with a [Node.js](https://nodejs.org/) web server using [Express](https://expressjs.com/).

## How to set up the application
- Run `npm install` inside this directory to install dependencies.
- Ensure that PostgreSQL instance is running on your computer (`psql -d mydb -U myusername`).
- Create the database and tables using the provided `schema.sql` by running the following command (`psql -f /server/database/schema.sql`).
- Start the application using the provided Express web server with two commands, `npm run react-dev` and `npm start`, in two separate terminal tabs.
- Upon page load the user will be prompted to login to their existing google account, which will enable the ability to import one's calendar

## Team of Full Stack Developers
  - Product Manager: Justin Greer 
  - Architectural Manager: Owen Crookston 
  - UI/UX Lead: Bulgan Erdenebaatar 
  - Joe Wagstaff 
  - Skip Harris 
  - Benjue Han 

## Table of Contents
 - Front End (UI/UX)
   - Friend's List
   - Calendar (week view)
   - Date & Time
 - Back End
   - Google Authentication
   - Server (Express) and Database (PostgreSQL)

## Application Documentation
* [Postman](https://www.getpostman.com/)
* [React Docs](https://reactjs.org)
* [Webpack Docs](https://webpack.js.org/)
* [Axios Docs](https://www.npmjs.com/package/axios)
* [Node.js Docs](https://nodejs.org/)
* [Express Docs](https://expressjs.com/)
* [Body Parser Middleware Docs](https://github.com/expressjs/body-parser)
* [MDN](https://developer.mozilla.org/)
* [Stack Overflow](http://stackoverflow.com/)
* [Google Search](https://google.com) to search for the correct page on any of the documentation above
