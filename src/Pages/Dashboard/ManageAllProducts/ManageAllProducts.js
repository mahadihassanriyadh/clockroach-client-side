import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

const ManageAllProducts = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [operationSuccessful, setOperationSuccessful] = useState(false);

    useEffect(() => {
        const url = `http://localhost:5000/products`
        fetch(url)
            .then(res => res.json())
            .then(data => setAllOrders(data));

    }, [])

    const deleteOrder = productId => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?')
        const url = `http://localhost:5000/products/${productId}`;
        if (confirmDelete) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Successfully deleted')
                        const remaining = allOrders.filter(myOrder => myOrder._id !== productId);
                        setAllOrders(remaining);
                        setOperationSuccessful(true);
                        setTimeout(() => setOperationSuccessful(false), 5000)
                    }
                })
        }
    }

    return (
        <div>
            <h1>Manage All Products</h1>
            {
                operationSuccessful &&
                <Alert severity="success">Operation Successfull</Alert>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
                <TableHead>
                    <TableRow>
                    <TableCell align="left">Product Id</TableCell>
                    <TableCell align="center">Product Code</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Delete Product</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders.map((row) => (
                    <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row._id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                        {row.productCode}
                        </TableCell>
                        <TableCell align="center">{row.size}</TableCell>
                        <TableCell align="center"> <Button onClick={() => { deleteOrder(row._id) }} style={{backgroundColor: '#f44336'}} variant="contained">X</Button> </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllProducts;