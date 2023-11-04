import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function EventForm({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      title,
      description,
      location,
      start,
      end,
    };

    // Call the onEventAdded callback to add the new event
    onEventAdded(newEvent);

    // Close the modal
    onClose();

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      onClose();
    }, 1000);
  };

  const onCancel = () => {
    setShowCancelMessage(true);
    setTimeout(() => {
      setShowCancelMessage(false);
      onClose();
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Datetime
          value={start}
          onChange={(date) => setStart(date)}
        />
        <Datetime
          value={end}
          onChange={(date) => setEnd(date)}
        />
        <button type="submit">Add Event</button>
        {showSuccessMessage && <p>Event successfully added</p>}

        <button type="button" onClick={onCancel}>Cancel</button>
        {showCancelMessage && <p>Canceled successfully</p>}
      </form>
    </div>
  );
}

export default EventForm;
