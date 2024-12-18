import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { LinkedIn } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTube from '@mui/icons-material/YouTube';
import { Navbar, Nav } from 'react-bootstrap';

function Headerbar() {
  return (
    <Navbar
      className="d-none d-lg-flex" // Hides the Headerbar on screens smaller than lg
      style={{
        backgroundColor: '#4BAF47',
        padding: '0 10px',
      }}
      expand="lg"
    >
      <Navbar.Collapse id="headerbar-navbar-nav">
        <Nav className="w-100 align-items-center">
          <div className="d-flex flex-column flex-lg-row align-items-center w-100 justify-content-between">
            <div className="d-flex flex-wrap align-items-center">
              <Nav.Link
                href="https://www.google.com/maps/search/?api=1&query=Wagholi,+Pune,+Maharashtra+412207" 
                target="_blank" 
                className="text-white d-flex align-items-center mx-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <LocationOnIcon />
                <span className="ml-1" style={{ fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
                  Wagholi, Pune, Maharashtra 412207
                </span>
              </Nav.Link>
              <Nav.Link
                href="mailto:info@kisaanstar.com" 
                className="text-white d-flex align-items-center mx-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <EmailIcon />
                <span className="ml-1" style={{ fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
                  info@kisaanstar.com
                </span>
              </Nav.Link>
            </div>
            <div className="d-flex mt-2 mt-lg-0">
              <Nav.Link 
                href="https://youtube.com/@kisaanstar?si=21s_5XXHiH7HwGdO" 
                target="_blank" 
                className="text-white mx-1" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <YouTube />
              </Nav.Link>
              <Nav.Link 
                href="https://www.instagram.com/kisaanstar?igsh=YWs3d2V3MW5oejE" 
                target="_blank" 
                className="text-white mx-1" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <InstagramIcon />
              </Nav.Link>
              <Nav.Link 
                href="https://www.linkedin.com/company/kisaanstar" 
                target="_blank" 
                className="text-white mx-1" 
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <LinkedIn />
              </Nav.Link>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Headerbar;