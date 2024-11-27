import React from 'react'
import { Box, Typography } from '@mui/material';
import Headerbar from '../../Components/SmallComponents/Headerbar';
import Header from '../../Components/SmallComponents/Header';
import Footer from '../../Components/SmallComponents/Footer';
import Footerbar from '../../Components/SmallComponents/Footerbar';
import CxprofileSidebar from '../../Components/CxprofileSidebar/Cxprofilesidebar'; // Import your sidebar

function FarmingDetails() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Headerbar />
      <Header />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <CxprofileSidebar />
        
        {/* Main Content Area for Orders */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
            height: '100%', // Maintains full height and allows scrolling
          }}
        >
          <Typography variant="h4">Farming Details</Typography>
          <div>Your Farming Details will be displayed here.</div>
          {/* Include your orders table or list here */}
        </Box>
      </Box>
      
      <Footer />
      <Footerbar />
    </Box>
  )
}

export default FarmingDetails