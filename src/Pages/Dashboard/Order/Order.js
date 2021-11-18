import { Box, Grid } from '@mui/material';
import React from 'react';

const Order = ({ order }) => {
    const { productId, email, time, orderStatus } = order;
    
    return (
        <Box>
            <Grid item xs={8}>
                 Product Id: {productId}   
            </Grid>
            
            <Grid item xs={4}>
                    
            </Grid>

            <Grid item xs={4}>
                    
            </Grid>

            <Grid item xs={8}>
                    
            </Grid>
        </Box>
    );
};

export default Order;