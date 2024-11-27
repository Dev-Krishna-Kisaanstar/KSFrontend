import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../Assets/Logo/Kisaanstarlogo1.webp';
import axios from 'axios';
import Cookies from 'js-cookie';

function Header() {
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by checking for a session cookie
        const token = Cookies.get('customerSession');
        setIsLoggedIn(!!token); // Set logged in state based on the presence of a token
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/customers/logout`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                // Clear the session cookie
                Cookies.remove('customerSession');
                setIsLoggedIn(false); // Update local state
                navigate('/'); // Redirect to home or wherever you like after logging out
            }
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : 'Server error');
            // Handle any logout error, e.g., show a message to the user
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ 
            backgroundColor: '#4BAF47', 
            padding: '0 10px', 
            borderTop: '2px solid white' // Added top border in white color
        }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" style={{ height: '60px', borderRadius: '20px' }} />
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white fw-bold" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-bold" to="/About">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-bold" to="/Services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-bold" to="/Products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-bold" to="/Contactus">Contact Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="btn nav-link text-white fw-bold" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        <IconButton color="inherit">
                            <SearchIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton color="inherit">
                            <ShoppingCartIcon style={{ color: 'white' }} />
                        </IconButton>
                        <div>
                            <IconButton 
                                color="inherit" 
                                onClick={handleProfileMenuOpen}
                            >
                                <AccountCircleIcon style={{ color: 'white' }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleProfileMenuClose}>
                                {isLoggedIn ? (
                                    <>
                                        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }} className="fw-bold">
                                            View Profile
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleProfileMenuClose(); logout(); }} className="fw-bold">
                                            Logout
                                        </MenuItem>
                                    </>
                                ) : (
                                    <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/login'); }} className="fw-bold">
                                        Login
                                    </MenuItem>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
