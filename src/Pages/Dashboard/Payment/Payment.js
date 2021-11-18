import { Container } from '@mui/material';
import React from 'react';
import payment from '../../../images/payment.png'
const Payment = () => {
    return (
        <Container>
            <img style={{width: "75%"}} src={payment} alt="" />
        </Container>
    );
};

export default Payment;