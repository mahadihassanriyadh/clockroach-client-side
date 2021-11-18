import { Container } from '@mui/material';
import React from 'react';
import banner from '../../../images/banner.png'

const Banner = () => {
    return (
        <Container>
            <img style={{width: '100%'}} src={banner} alt="" />
        </Container>
    );
};

export default Banner;