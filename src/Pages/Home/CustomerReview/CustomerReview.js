import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid, Rating } from '@mui/material';

const CustomerReview = ({ reviewdetail }) => {
    const { star, name, review, img } = reviewdetail;
    return (
        <Grid sx={{ display: 'flex' }} item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {review}
                    </Typography>
                <Rating name="read-only" value={star} readOnly />
            </CardContent>
            </Card>
        </Grid>
    );
};

export default CustomerReview;