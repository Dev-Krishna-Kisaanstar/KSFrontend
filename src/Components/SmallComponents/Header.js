import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { IconButton, Menu, MenuItem } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import logo from '../../Assets/Logo/Kisaanstarlogo1.webp';
import Cookies from 'js-cookie';

function Header() {
  const navigate = useNavigate(); 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isLoggedIn = Boolean(Cookies.get('token')); 

  // Accessing the API URL from environment variables
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token from the cookies
    handleProfileMenuClose();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd', padding: '0 10px' }}>
      <div className="container-fluid">
        {/* Logo */}
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
          {/* Navigation Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ fontFamily: 'Inter, sans-serif' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About" style={{ fontFamily: 'Inter, sans-serif' }}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Services" style={{ fontFamily: 'Inter, sans-serif' }}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Products" style={{ fontFamily: 'Inter, sans-serif' }}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contactus" style={{ fontFamily: 'Inter, sans-serif' }}>Contact Us</Link>
            </li>
            {/* Show Login button when not logged in */}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="btn nav-link" to="/login" style={{ fontFamily: 'Inter, sans-serif' }}>Login</Link>
              </li>
            )}
          </ul>
          {/* Search and Cart Icons */}
          <div className="d-flex align-items-center">
            <IconButton color="inherit" sx={{ fontFamily: 'Inter, sans-serif' }}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ fontFamily: 'Inter, sans-serif' }}>
              <ShoppingCartIcon />
            </IconButton>
            {/* Profile Icon always visible */}
            <div>
              <IconButton 
                color="inherit" 
                onClick={handleProfileMenuOpen}
                sx={{ fontFamily: 'Inter, sans-serif' }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                {isLoggedIn ? (
                  <>
                    <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>View Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/login'); }}>Login</MenuItem>
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