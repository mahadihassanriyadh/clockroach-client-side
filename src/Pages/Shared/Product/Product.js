import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Product = ({ product }) => {
    const { productCode, price, img, size, category, _id } = product;
    const history = useHistory();
    const handleBuyNow = () => {
        history.push(`/placeOrder/${_id}`)
    }
    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {price} BDT
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Product Code: {productCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Category: {category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Size: {size}
                    </Typography>
                </CardContent>
                <Button onClick={handleBuyNow} style={{marginBottom: 10, color: 'black', backgroundColor: '#ffc400'}} variant="contained">Buy Now</Button>
            </Card>
        </Grid>
    );
};

export default Product;