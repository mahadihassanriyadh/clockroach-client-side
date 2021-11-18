import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const ManageAllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [operationSuccessful, setOperationSuccessful] = useState(false);

    useEffect(() => {
        const url = `https://rocky-reef-73687.herokuapp.com/allOrders`
        fetch(url)
            .then(res => res.json())
            .then(data => setAllOrders(data));

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
                        const remaining = allOrders.filter(myOrder => myOrder._id !== orderId);
                        setAllOrders(remaining);
                        setOperationSuccessful(true);
                        setTimeout(() => setOperationSuccessful(false), 5000)
                    }
                })
        }
    }

    const updateOrder = orderId => {
        const confirmUpdate = window.confirm('Are you sure you want to approve this order?')
        const url = `https://rocky-reef-73687.herokuapp.com/updateStatus/${orderId}`
        if (confirmUpdate) {
            axios.put(url, {
                status: "shipped"
            })
                .then(res => {
                    console.log(res);
                    const findPackage = allOrders.find(order => orderId === order._id)
                    findPackage.orderStatus = "shipped";

                    const remaining = allOrders.filter(order => order._id !== orderId);
                    
                    remaining.push(findPackage)
                    setAllOrders(remaining);
                    setOperationSuccessful(true);
                    setTimeout(() => setOperationSuccessful(false), 5000)
                    // window.location.reload();
                })
        }
    }

    return (
        <div>
            <h1>Manage All Orders</h1>
            {
                operationSuccessful &&
                <Alert severity="success">Operation Successfull</Alert>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
                <TableHead>
                    <TableRow>
                    <TableCell>Order By</TableCell>
                    <TableCell align="center">Order Id</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Order Status</TableCell>
                    <TableCell align="center">Cancel Order</TableCell>
                    <TableCell align="center">Approve Order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders.map((row) => (
                    <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.email}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                        {row._id}
                        </TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">{row.orderStatus}</TableCell>
                        <TableCell align="center"> <Button onClick={() => { deleteOrder(row._id) }} style={{backgroundColor: '#f44336'}} variant="contained">X</Button> </TableCell>
                        <TableCell align="center"> <Button onClick={() => { updateOrder(row._id) }} style={{backgroundColor: '#64dd17'}} variant="contained">✔</Button> </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllOrders;