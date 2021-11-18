import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header/Header';
import Product from '../Shared/Product/Product';

const Explore = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products?place=explore')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <>
        <Header></Header>
        <Container>
            <Typography variant="h4" sx={{fontWeight: 500, marginTop: 2}} gutterBottom component="div">
                More of Our Products
                <Box sx={{ flexGrow: 1, mt: 5 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 16 }}>
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
    </>
    );
};

export default Explore;