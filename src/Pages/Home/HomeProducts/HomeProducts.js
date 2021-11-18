import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../../Shared/Product/Product';

const HomeProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products?place=homeProducts')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <Container>
            <Typography variant="h4" sx={{fontWeight: 500, marginTop: 8}} gutterBottom component="div">
                Our Most Popular Products
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            products.map(product => <Product
                                key={product._id}
                                product={product}
                            ></Product>)
                        }
                    </Grid>
                </Box>
            </Typography>
        </Container>
    );
};

export default HomeProducts;