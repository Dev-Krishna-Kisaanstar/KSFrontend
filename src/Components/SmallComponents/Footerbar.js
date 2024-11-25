import React from 'react';

function Footerbar() {
    return (
        <div
            className="container-fluid text-center py-3"
            style={{
                backgroundColor: '#24231D',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif' // Set default font for the footer
            }}
        >
            <div className="row">
                {/* Column 1: Copyright Text */}
                <div className="col-md-6">
                    <p style={{ margin: 0, fontFamily: 'Exo, sans-serif' }}>
                        @all copyright reserved
                    </p>
                </div>

                {/* Column 2: Terms and Privacy Links */}
                <div className="col-md-6">
                    <p style={{ margin: 0 }}>
                        <a
                            href="/terms-of-use"
                            style={{
                                textDecoration: 'none',
                                color: '#FFFFFF',
                                marginRight: '15px',
                                fontFamily: 'Exo, sans-serif' // Change font for links
                            }}
                        >
                            Terms of Use
                        </a>
                        |
                        <a
                            href="/privacy-policy"
                            style={{
                                textDecoration: 'none',
                                color: '#FFFFFF',
                                marginLeft: '15px',
                                fontFamily: 'Exo, sans-serif' // Change font for links
                            }}
                        >
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footerbar;