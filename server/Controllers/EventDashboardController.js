const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');

// Fetch all events
router.get('/api/calendar/get-events', async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});


const onEventAdded = (eventData) => {
 axios.post('/api/calendar/add-event', eventData)
  .then((response) => {
    // Handle success
    fetchAllEvents(); // Refresh the events list
 })
   .catch((error) => {
    console.error('Failed to add event:', error);
   });
 };

// Edit an event
router.put('/api/calendar/edit-event/:_Id', async (req, res) => {
  const { title, description, location, start, end } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params._Id,
      { title, description, location, start, end },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
});


// Delete an event
router.delete('/api/calendar/delete-event/:_Id', async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params._Id);
    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the event' });
  }
});


module.exports = router;
