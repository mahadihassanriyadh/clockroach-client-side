import React from 'react';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import HomeProducts from '../HomeProducts/HomeProducts';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <HomeProducts></HomeProducts>
        </div>
    );
};

export default Home;