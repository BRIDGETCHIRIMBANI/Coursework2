import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home" style={{ color: 'darkred', fontWeight: 'bold', fontStyle: 'italic' }}>
        ALU Alumni
      </Navbar.Brand>
      <Nav.Link href="/home">Home</Nav.Link>
      <NavDropdown title="About" id="basic-nav-dropdown">
            <NavDropdown.Item href="#about/vision">Vision</NavDropdown.Item>
            <NavDropdown.Item href="#about/articles">Articles</NavDropdown.Item>
            <NavDropdown.Item href="#about/gallery">Gallery</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="./calendar">Calendar</Nav.Link>
          <Nav.Link href="./login">Login</Nav.Link>
        <Nav className="ml-auto">
        
         
        </Nav>
    </Navbar>
  );
}

export default MyNavbar;
