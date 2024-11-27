import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import VerifiedIcon from '@mui/icons-material/Verified';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import FarmerIcon from '../Assets/Logo/farmervector.webp';
import Headerbar from '../Components/SmallComponents/Headerbar';
import Header from '../Components/SmallComponents/Header';
import Footer from '../Components/SmallComponents/Footer';
import Footerbar from '../Components/SmallComponents/Footerbar';
import CxprofileSidebar from '../Components/CxprofileSidebar/Cxprofilesidebar';

const ViewProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    const token = Cookies.get('customerSession');

    if (!token) {
      setMessage('No token found, please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/dashboard`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomer(response.data.customer);
      setUpdatedCustomer(response.data.customer);
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    const token = Cookies.get('customerSession');

    if (!token) {
      setMessage('No token found, please log in again.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/customers/update`,
        updatedCustomer,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setCustomer(response.data.customer);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Headerbar />
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '50px', display: 'flex' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CxprofileSidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            {message && (
              <Typography color="error" variant="h6" align="center">
                {message}
              </Typography>
            )}
            {loading ? (
              <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
                <CircularProgress />
              </Grid>
            ) : customer ? (
              <>
                <Card style={{ margin: '20px 0', borderRadius: '15px' }}>
                  <CardHeader
                    avatar={
                      <img
                        src={FarmerIcon}
                        alt="Farmer Icon"
                        style={{ width: 80, height: 80, borderRadius: '50%' }}
                      />
                    }
                    title={
                      <Typography variant="h5" fontWeight="bold" align="center">
                        {customer.fullName}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="textSecondary" align="center">
                        {customer.mobileNumber}
                      </Typography>
                    }
                    style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Full Name"
                          value={updatedCustomer.fullName || ''}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          disabled={!isEditing}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Mobile Number"
                          value={updatedCustomer.mobileNumber || ''}
                          onChange={(e) => handleChange('mobileNumber', e.target.value)}
                          disabled={!isEditing}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Registration Date"
                          value={new Date(customer.registrationDate).toLocaleDateString()}
                          disabled
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Registered By"
                          value={customer.registeredBy || ''}
                          disabled
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="success"
                      style={{
                        marginTop: '20px',
                        width: '200px',
                        backgroundColor: '#4BAF47',
                        borderRadius: '25px',
                        height: '50px',
                      }}
                      onClick={isEditing ? handleSave : handleEdit}
                      startIcon={isEditing ? <SaveIcon style={{ color: '#fff' }} /> : <EditIcon style={{ color: '#fff' }} />}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Features Section */}
                <Typography variant="h5" style={{ marginTop: '30px', marginBottom: '20px' }}>
                  Our Features
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <AgricultureIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Extensive Range</Typography>
                        <Typography variant="body2" color="textSecondary">
                          We offer the most extensive range of agricultural products. Offering variety
                          to our customers is our forte.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <VerifiedIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Assured Quality</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Every product available on Agrosiaa is authenticated and tested by our team of
                          experts. We assure you absolute quality and authenticity.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <MonetizationOnIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Cost Effective</Typography>
                        <Typography variant="body2" color="textSecondary">
                          All the products on Agrosiaa are cost-effective. There are no hidden or extra
                          charges on the MRP.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <ShoppingCartIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Easy Purchase</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Buying a product here is just a matter of a few clicks. Purchasing anything on
                          Agrosiaa is an absolutely easy and safe process.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <LocalShippingIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Seamless Shipping</Typography>
                        <Typography variant="body2" color="textSecondary">
                          We deliver your products directly to your doorstep with no extra shipping
                          charges and on time.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={{ height: '100%' }}>
                      <CardContent>
                        <DeviceHubIcon style={{ fontSize: 40, color: '#4BAF47' }} />
                        <Typography variant="h6">Online Dashboard</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Monitor your purchases, track your orders, and manage your profile with ease
                          through our online dashboard.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="h6" color="error" align="center">
                No customer data found.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Footerbar />
    </>
  );
};

export default ViewProfile;