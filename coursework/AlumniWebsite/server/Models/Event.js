const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    start: Date,
    end: Date
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
