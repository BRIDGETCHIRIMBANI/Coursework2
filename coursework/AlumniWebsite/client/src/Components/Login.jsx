import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

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

const registerNowStyle = {
  fontWeight: 'bold',
  color: 'red',
};

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      // Perform login or authentication here
      console.log('Login successful');
    } catch (error) {
      console.error('An error occurred while logging in:', error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}> <p>Welcome Alumni!</p> </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
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
            Login
          </button>
        </div>
      </Form>
      <p>
        Not yet a registered alumni?{' '}
        <Nav.Link href="/newsignup" style={registerNowStyle}>
          Register Now
        </Nav.Link>
      </p>
    </div>
  );
}

export default Login;
