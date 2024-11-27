import React from 'react';
import logo from '../../Assets/Logo/Kisaanstarlogo1.webp'

function Footer() {
    return (
        <div
            className="container-fluid text-center py-4"
            style={{
                backgroundColor: '#4BAF47',
                color: '#FFFFFF', // Ensures text is visible on dark background
                fontFamily: 'Inter, sans-serif' // Change default font for the footer
            }}
        >
            <div className="row">
                {/* Column 1: Logo, Description, Social Media */}
                <div className="col-lg-3 col-md-6 text-start">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: '200px', marginBottom: '15px',borderRadius:'30px' }}
                    />
                    <p style={{ fontFamily: 'Exo, sans-serif' }}>
                        A brief description about the company or organization.
                        Providing insight into your mission or vision.
                    </p>
                    <div>
                        {/* Social Media Icons */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '0 5px', color: '#FFFFFF' }}
                        >
                            <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '0 5px', color: '#FFFFFF' }}
                        >
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '0 5px', color: '#FFFFFF' }}
                        >
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div className="col-lg-3 col-md-6 text-start">
                    <h5 style={{ fontFamily: 'Exo, sans-serif' }}>Navigation</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="/home" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/services" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: News */}
                <div className="col-lg-3 col-md-6 text-start">
                    <h5 style={{ fontFamily: 'Exo, sans-serif' }}>News</h5>
                    <ul className="list-unstyled">
                        <li>
                            <a href="/news/1" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Latest Updates
                            </a>
                        </li>
                        <li>
                            <a href="/news/2" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Blog Post 1
                            </a>
                        </li>
                        <li>
                            <a href="/news/3" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                                Blog Post 2
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div className="col-lg-3 col-md-6 text-start">
                    <h5 style={{ fontFamily: 'Exo, sans-serif' }}>Contact Us</h5>
                    <p>
                        <i className="fas fa-phone"></i>{' '}
                        <a
                            href="tel:+918830385928" // Link to dial the phone number
                            style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                            +91 883 038 5928
                        </a>
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i>{' '}
                        <a
                            href="mailto:info@kisaanstar.com" // Link to email
                            style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                            info@kisaanstar.com
                        </a>
                    </p>
                    <p>
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Wagholi,+Pune,+Maharashtra+412207"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: '#FFFFFF' }}
                        >
                            4th floor, office number 401, Vishwaraj Pride, Nagar Rd, near hp petrol pump, Wagholi, Pune, Maharashtra 412207
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;