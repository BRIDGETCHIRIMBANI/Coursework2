const router = require("express").Router();
const Event = require("../Models/Event");
const moment = require("moment");

// Create event
router.post("/create-event", async (req, res) => {
  try {
    console.log("Received event data:", req.body);
    const event = new Event(req.body);
    await event.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get events
router.get("/get-events", async (req, res) => {
  try {
    const start = moment(req.query.start).toDate();
    const end = moment(req.query.end).toDate();

    const events = await Event.find({
      start: { $gte: start },
      end: { $lte: end },
    });

    console.log("Fetched events:", events);

    res.send(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update event
router.put("/update-event", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete event
router.delete("/delete-event", async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await Event.findByIdAndRemove(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(204).end(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
