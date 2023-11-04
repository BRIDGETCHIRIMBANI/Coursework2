import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import EventForm from './EventModal';
import axios from 'axios';

function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get('api/calendar/get-events:');
      console.log('Response Data:', response.data); 
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  useEffect(() => {
    // Fetch events from the database when the component mounts
    fetchAllEvents();
  }, []);

  const handleAddEvent = async (newEvent) => {
    try {
      // Send the new event data to the backend to add it to the database
      const response = await axios.post('/api/calendar/create-event', newEvent);

      // Update the events state to include the newly added event
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const handleEditEvent = async (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleDeleteEvent = async (event) => {
    try {
      if (!event || !event._id) {
        console.error("Event or event._id is missing or undefined.");
        return;
      }

      await axios.delete(`/api/calendar/delete/${event._id}`);
      // Refresh the events after deleting
      fetchAllEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div>
      <h2>Event Dashboard</h2>
      <button onClick={() => setModalOpen(true)}>Add Event</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.start}</td>
                <td>{event.end}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditEvent(event)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteEvent(event)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {modalOpen && (
        <EventForm
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedEvent(null);
          }}
         onEventAdded={handleAddEvent} // Make sure to pass the correct function
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
}

export default EventDashboard;
