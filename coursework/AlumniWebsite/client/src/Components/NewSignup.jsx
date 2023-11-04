import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const containerStyle = {
  border: '3px solid red',
  backgroundColor: 'white',
  padding: '30px',
  textAlign: 'center',
  width: '300px',
  margin: '0 auto',
};

const titleStyle = {
  color: 'red',
};

const buttonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
};

const buttonHoverStyle = {
  backgroundColor: 'darkgreen',
};

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    profession: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const [isHovered, setHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('An error occurred while signing up:', error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProfession">
          <Form.Label>Profession:</Form.Label>
          <Form.Control
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
           required
          />
        </Form.Group>
        <div>
          <button
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
