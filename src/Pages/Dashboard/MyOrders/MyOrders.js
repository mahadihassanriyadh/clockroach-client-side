import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const url = `http://localhost:5000/placeOrder?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyOrders(data));

    }, [])
    return (
        <div>
            <h1>Total Orders: {myOrders.length}</h1>
            
        </div>
    );
};

export default MyOrders;