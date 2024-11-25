import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.css'; // Custom styles
import Headerbar from '../Components/SmallComponents/Headerbar';
import Header from '../Components/SmallComponents/Header';
import Footer from '../Components/SmallComponents/Footer';
import Footerbar from '../Components/SmallComponents/Footerbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Cookies from 'js-cookie'; // Import Cookies
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Check if the user is already logged in
  useEffect(() => {
    const token = Cookies.get('token');
    const savedUserName = Cookies.get('userName');

    if (token) {
      navigate('/'); // Redirect to home if already logged in
    }

    if (savedUserName) {
      setUserName(savedUserName); // Set user name in state
    }
  }, [navigate]);

  const toggleForms = () => {
    setIsSignup((prev) => !prev);
    setFormData({
      fullName: '',
      mobileNumber: '',
      password: '',
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isSignup ? '/api/customers/register' : '/api/customers/login';
    const method = 'POST';

    const body = isSignup
      ? JSON.stringify({
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          password: formData.password,
        })
      : JSON.stringify({
          mobileNumber: formData.mobileNumber,
          password: formData.password,
        });

    // Log the full API URL for debugging
    const fullApiUrl = `${process.env.REACT_APP_API_URL}${endpoint}`;

    try {
      const response = await fetch(fullApiUrl, { // Use the constructed URL
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        const message = isSignup ? 'User registered successfully' : 'User logged in successfully';
        toast.success(message);
        if (!isSignup && data.token) {
          Cookies.set('token', data.token, { expires: 7 });
          Cookies.set('userName', formData.fullName, { expires: 7 });
          navigate('/');
        }
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('Network error, please try again.');
      toast.error('Network error, please try again.');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    navigate('/login');
  };

  return (
    <div>
      <Headerbar />
      <Header />

      {/* Profile Icon Section */}
      <div className="profile-icon" style={{ position: 'relative', margin: '10px' }}>
        <img
          src="profile_icon.png"
          alt="Profile"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          style={{ cursor: 'pointer', width: '30px', height: '30px' }}
        />
        {showProfileMenu && (
          <div
            className="profile-menu"
            style={{
              position: 'absolute',
              right: 0,
              background: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              padding: '10px',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: '10px' }}>Hello, {userName || 'Guest'}</div>
            <button className="btn btn-link text-primary" onClick={() => navigate('/profile')}>
              View Profile
            </button>
            <button className="btn btn-link text-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="login-global d-flex align-items-center justify-content-center vh-100">
        <section
          className={`login-wrapper ${isSignup ? 'active' : ''} p-5 rounded shadow bg-primary text-white`}
        >
          <div className="login-form signup">
            <header onClick={toggleForms} className="mb-4 cursor-pointer">
              {isSignup ? 'Switch to Login' : 'Switch to Signup'}
            </header>
            {isSignup ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Mobile number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {error && <div className="text-danger mb-3">{error}</div>}
                <input type="submit" className="btn btn-light btn-block" value="Signup" />
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Mobile number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {error && <div className="text-danger mb-3">{error}</div>}
                <a href="#" className="text-white">
                  Forgot password?
                </a>
                <input type="submit" className="btn btn-light btn-block mt-3" value="Login" />
              </form>
            )}
          </div>
        </section>
      </div>

      <ToastContainer />

      <Footer />
      <Footerbar />
    </div>
  );
}

export default Login;