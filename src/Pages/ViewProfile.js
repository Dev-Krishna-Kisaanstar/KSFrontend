import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Retrieve the token from cookies
      const token = Cookies.get('token');
      console.log('Token:', token);  // Log the token
      
      // Check if token exists
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        // Make the API request to fetch the user profile
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Set the token in the headers
            'Content-Type': 'application/json',
          },
        });

        // Assuming the response data structure is correct
        if (response.data && response.data.customer) {
          setProfile(response.data.customer);  // Set the profile state with the returned data
        } else {
          setError('Profile data is not available.');
        }
      } catch (err) {
        // Check for Axios error and log detailed error information
        if (axios.isAxiosError(err) && err.response) {
          console.log('Error response:', err.response);  // Log the full error response for debugging
          setError(err.response.data.message || 'An error occurred while fetching the profile data.');
        } else {
          setError('An unexpected error occurred.');  // Handle unexpected errors gracefully
        }
      } finally {
        setLoading(false);  // Ensure loading state is updated
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Render profile information
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Profile Information</Typography>
      <Typography variant="h6">Full Name: {profile?.fullName || 'N/A'}</Typography>
      <Typography variant="h6">Mobile Number: {profile?.mobileNumber || 'N/A'}</Typography>
      <Typography variant="h6">
        Registration Date: {profile?.registrationDate ? new Date(profile.registrationDate).toLocaleDateString() : 'N/A'}
      </Typography>
      <Typography variant="h6">Registered By: {profile?.registeredBy || 'N/A'}</Typography>
    </div>
  );
};

export default ViewProfile;