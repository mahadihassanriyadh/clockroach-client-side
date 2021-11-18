import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomerReview from '../CustomerReview/CustomerReview';


const CustomerReviews = () => {
    const [reviewdetails, setReviewdetails] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviewdetails(data))
    }, [])
    return (
        <Container>
            <Typography variant="h4" gutterBottom component="div" sx={{fontWeight: 500, marginTop: 10, marginBottom: 3}}>
                Customer Reviews
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    reviewdetails.map(reviewdetail => <CustomerReview
                        key={reviewdetail._id}
                        reviewdetail={reviewdetail}
                    ></CustomerReview>)
                }
            </Grid>
        </Container>
    );
};

export default CustomerReviews;