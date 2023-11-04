require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const CalendarControllers = require('./Controllers/CalendarControllers');
const SignupControllers = require('./Controllers/SignupControllers');
const AdminController = require('./Controllers/AdminController');
const EventDashboardController = require('./Controllers/EventDashboardController');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server started"));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use('/api/calendar', require('./Controllers/CalendarControllers'));
app.use('/api', require('./Controllers/SignupControllers'));
app.use('/api', require('./Controllers/AdminController'));
app.use('/api/calendar', require('./Controllers/EventDashboardController'));
