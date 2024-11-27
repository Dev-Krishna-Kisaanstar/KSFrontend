import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Headerbar from '../Components/SmallComponents/Headerbar';
import Header from '../Components/SmallComponents/Header';
import Footer from '../Components/SmallComponents/Footer';
import Footerbar from '../Components/SmallComponents/Footerbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        password: '',
        advisorName: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('customerSession');
        if (token) {
            navigate('/'); // Redirect to dashboard if already logged in
        }
    }, [navigate]);

    const toggleForms = () => {
        setIsSignup(prev => !prev);
        setFormData({
            fullName: '',
            mobileNumber: '',
            password: '',
            advisorName: '',
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isSignup ? '/register' : '/login';
        const body = isSignup
            ? {
                fullName: formData.fullName,
                mobileNumber: formData.mobileNumber,
                password: formData.password,
                advisorName: formData.advisorName || 'Registered by self',
              }
            : {
                mobileNumber: formData.mobileNumber,
                password: formData.password,
              };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/customers${endpoint}`, body, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.status === 201 || response.status === 200) {
                const message = isSignup ? 'User registered successfully' : 'User logged in successfully';
                toast.success(message);

                if (!isSignup && response.data.token) {
                    Cookies.set('customerSession', response.data.token, { expires: 1 / 12 }); // Store for approximately 2 hours
                    navigate('/'); // Redirect to the dashboard
                }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Network error, please try again.';
            setError(message);
            toast.error(message);
        }
    };

    return (
        <div>
            <Headerbar />
            <Header />
            <div className="login-global d-flex align-items-center justify-content-center vh-100">
                <section className={`login-wrapper ${isSignup ? 'active' : ''} p-5 rounded shadow bg-primary text-white`}>
                    <div className="login-form">
                        <header className="mb-4 cursor-pointer" onClick={toggleForms}>
                            {isSignup ? 'Switch to Login' : 'Switch to Signup'}
                        </header>
                        <form onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Error alert */}
                            {isSignup && (
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Full name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    minLength={7}
                                />
                            )}
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Mobile number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                                pattern="\d{10}"
                                title="Mobile number must be exactly 10 digits."
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
                            {isSignup && (
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Advisor name (Optional)"
                                    name="advisorName"
                                    value={formData.advisorName}
                                    onChange={handleChange}
                                />
                            )}
                            <button 
                                type="submit"
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    fontSize: '18px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    width: '100%',
                                    outline: 'none'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                                {isSignup ? 'Register' : 'Login'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
            <Footerbar />
            <ToastContainer />
        </div>
    );
}

export default Login;