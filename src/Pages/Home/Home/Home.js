import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import HomeProducts from '../HomeProducts/HomeProducts';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <HomeProducts></HomeProducts>
            <CustomerReviews></CustomerReviews>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;