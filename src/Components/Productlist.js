import React, { useState, useEffect } from 'react';
import {
    TextField,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Container,
    Button,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

function Productlist() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6); // State to track visible products
    const [expandedProduct, setExpandedProduct] = useState(null); // State to track which product is expanded

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const response = await axios.get("https://api.kisaanstar.com/api/operational-admin/products");
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // Increase the number of visible products
    };

    const toggleDescription = (productId) => {
        // Toggle the expanded state for the specific product
        if (expandedProduct === productId) {
            setExpandedProduct(null); // Collapse
        } else {
            setExpandedProduct(productId); // Expand
        }
    };

    // Button styles similar to Home component
    const buttonStyles = {
        fontFamily: 'Exo, sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        color: '#FFF',
        backgroundColor: '#DAB060',
        border: 0,
        padding: '8px 16px',
        borderRadius: '20px',
        position: 'relative',
        transition: 'transform 0.1s',
        '&:hover': {
            transform: 'translateY(-10%) scale(1.1)',
            boxShadow: '0 0 10px rgba(218, 176, 96, 0.5)',
        },
        '&:active': {
            transform: 'translateY(5%) scale(0.9)',
        },
    };

    return (
        <Container className="mt-5">
            <Typography variant="h4" className="mb-4" align="center" sx={{ fontFamily: 'Exo, sans-serif' }}>
                Product List
            </Typography>
            <TextField
                variant="outlined"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
                sx={{
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    maxWidth: '400px', // Set a maximum width
                    width: '100%', // Ensure it takes full width of its parent container
                    margin: '0 auto', // Center it horizontally
                }}
            />

            {loading ? (
                <Container align="center">
                    <CircularProgress />
                </Container>
            ) : error ? (
                <Typography variant="h6" align="center" className="mt-4" sx={{ fontFamily: 'Inter, sans-serif' }}>
                    Error: {error}
                </Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {filteredProducts.slice(0, visibleCount).map(product => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card className="shadow-lg" sx={{ borderRadius: '20px', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="300" // Reduced height for better mobile display
                                        image={product.images[0] || 'https://via.placeholder.com/500'} // Use the first image or fallback
                                        alt={product.name}
                                        style={{ borderRadius: '20px 20px 0 0', objectFit: 'cover' }} // Rounded corners and cover
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ fontFamily: 'Exo, sans-serif' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                                            {expandedProduct === product._id ? (
                                                <span>{product.description}</span>
                                            ) : (
                                                <span>
                                                    {product.description.length > 100 ? (
                                                        <>
                                                            {product.description.substring(0, 100)}... 
                                                            <Button 
                                                                onClick={() => toggleDescription(product._id)} 
                                                                variant="text" 
                                                                sx={{
                                                                    fontFamily: 'Inter, sans-serif',
                                                                    textTransform: 'none',
                                                                    padding: 0,
                                                                    color: 'primary.main',
                                                                    '&:hover': {
                                                                        textDecoration: 'underline',
                                                                    },
                                                                }}
                                                            >
                                                                Read More
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        product.description
                                                    )}
                                                </span>
                                            )}
                                        </Typography>
                                        <Typography variant="h6" className="mt-2" sx={{ fontFamily: 'Exo, sans-serif' }}>
                                            ₹ {product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {filteredProducts.length === 0 && (
                        <Typography variant="h6" align="center" className="mt-4" sx={{ fontFamily: 'Inter, sans-serif' }}>
                            No products found.
                        </Typography>
                    )}
                    {visibleCount < filteredProducts.length && (
                        <div className="text-center mt-4">
                            <Button
                                variant="contained"
                                sx={buttonStyles} // Apply the same button styles here
                                onClick={handleViewMore}
                            >
                                View More
                            </Button>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default Productlist;