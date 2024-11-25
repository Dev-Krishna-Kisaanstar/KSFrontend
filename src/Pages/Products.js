import React from 'react';
import Header from '../Components/SmallComponents/Header'; // Assuming this import is correct
import Headerbar from '../Components/SmallComponents/Headerbar'; // Assuming this import is correct
import Productlist from '../Components/Productlist';
import Footer from '../Components/SmallComponents/Footer';
import Footerbar from '../Components/SmallComponents/Footerbar';

function Products() {
  return (
    <div>
      <Headerbar />
      <Header />
      <Productlist />

      <div style={{ padding: '40px 0 0' }}>
        <Footer />
        <Footerbar />
      </div>
    </div>
  );
}

export default Products;