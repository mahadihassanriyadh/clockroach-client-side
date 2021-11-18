import React from 'react';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import HomeProducts from '../HomeProducts/HomeProducts';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <HomeProducts></HomeProducts>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;