import { Alert, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Paper from '@mui/material/Paper';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();
    const [operationSuccessful, setOperationSuccessful] = useState(false);
    useEffect(() => {
        const url = `https://rocky-reef-73687.herokuapp.com/myOrders?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyOrders(data));

    }, [])
    const deleteOrder = orderId => {
        const confirmDelete = window.confirm('Are you sure you want to cancel this order?')
        const url = `https://rocky-reef-73687.herokuapp.com/placeOrder/${orderId}`;
        if (confirmDelete) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Successfully deleted')
                        const remaining = myOrders.filter(myOrder => myOrder._id !== orderId);
                        setMyOrders(remaining);
                        setOperationSuccessful(true);
                        setTimeout(() => setOperationSuccessful(false), 5000)
                    }
                })
        }
    }
    return (
        <div>
            <h1>Total Orders: {myOrders.length}</h1>
            {
                operationSuccessful &&
                <Alert severity="success">Operation Successfull</Alert>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
                <TableHead>
                    <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right">Cancel Order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myOrders.map((row) => (
                    <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row._id}
                        </TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        <TableCell align="right">{row.orderStatus}</TableCell>
                        <TableCell align="right"> <Button onClick={() => { deleteOrder(row._id) }} style={{backgroundColor: '#f44336'}} variant="contained">X</Button> </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrders;