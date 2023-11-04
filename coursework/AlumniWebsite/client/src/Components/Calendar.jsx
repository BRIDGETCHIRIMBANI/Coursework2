import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventForm from './EventModal';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false); 
  
// Define a function to check user authentication status
const checkUserAuthentication = () => {
  return userAuthenticated; // Replace with your actual authentication check.
};

 // Handle the "Add Event" button click
 const handleAddEventClick = () => {
  if (userAuthenticated) {
    setModalOpen(true); // User is authenticated, open the modal
  } else {
    // User is not authenticated, provide a link to the login page or show an alert
    alert('Please log in to add an event.'); // You can customize this message
  }
};
  // Define the fetchEvents function
const fetchEvents = async () => {
  try {
    const start = calendarRef.current.getApi().view.activeStart;
    const end = calendarRef.current.getApi().view.activeEnd;

    const response = await axios.get('/api/calendar/get-events', {
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });

    const formattedEvents = response.data.map((event) => ({
      id: event._id, 
      title: event.title, 
      description: event.description,
      location: event.location,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    }));

    setEvents(formattedEvents);
  } catch (error) {
    console.error('Failed to load events:', error);
  }
};

  // Handle add event
  const handleAddEvent = async (event) => {
    try {
      await axios.post('/api/calendar/create-event', event);
      setModalOpen(false);
      // Refresh the events after adding a new one
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  useEffect(() => {
    // Fetch the events from the backend API when the component mounts
    fetchEvents();
  }, []);

  return (
    <section>
      <button onClick={handleAddEventClick}>Add Event</button>
      {/*<button onClick={() => setModalOpen(true)}>Add Event</button>*/}
      <div style={{ position: 'relative', zIndex: 0, background: '', color: 'white', border: '', padding: '10px 20px', cursor: 'pointer' }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>
        {modalOpen && (
          <EventForm
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            onEventAdded={handleAddEvent}
          />
        )}
      </section>
    );
  }
  
  export default Calendar;