import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Box sx={{mt: 15, py: 7, backgroundColor: '#212121', color: 'white'}}>
            <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }}>
                    <Grid item xs={2} sm={6} md={4}>
                        <Typography style={{textAlign: 'start'}} sx={{fontWeight: 500, marginBottom: 0}} variant="h4" gutterBottom component="div">
                            Clockroach
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            <NavLink style={{textDecoration: 'none', color: 'white'}} to="/">Home</NavLink>
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            <NavLink style={{textDecoration: 'none', color: 'white'}} to="/products">Products</NavLink>
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            <NavLink style={{textDecoration: 'none', color: 'white'}} to="/dashboard">Dashboard</NavLink>
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6}>
                    <Typography style={{textAlign: 'start'}} sx={{fontWeight: 500, marginBottom: 0}} variant="h6" gutterBottom component="div">
                            Contact Details
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            Phone No. +8801914523587
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            Email: info@clockroachbd.com
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                            Address: Sector 7, Road 15, House 32, Uttara, Dhaka-1230.
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={6} md={2}>
                    <Typography style={{textAlign: 'start'}} sx={{fontWeight: 500}} variant="h6" gutterBottom component="div">
                            Follow Us On
                        </Typography>
                        <Typography style={{textAlign: 'start'}}>
                        <FacebookOutlinedIcon/> <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.facebook.com/clockroachbd">Facebook</a>
                        </Typography>
                        <Typography style={{textAlign: 'start', marginTop: '5px'}}>
                        <InstagramIcon/> <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.instagram.com/clockroachbd/">Instagram</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;