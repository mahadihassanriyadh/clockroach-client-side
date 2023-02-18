import {
    Alert,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";

const ManageAllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [operationSuccessful, setOperationSuccessful] = useState(false);

    useEffect(() => {
        const url = `https://clockroach-server.onrender.com/allOrders`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setAllOrders(data));
    }, []);

    // const deleteOrder = orderId => {
    //     const confirmDelete = window.confirm('Are you sure you want to cancel this order?')
    //     const url = `https://clockroach-server.onrender.com/placeOrder/${orderId}`;
    //     if (confirmDelete) {
    //         fetch(url, {
    //             method: 'DELETE'
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if (data.deletedCount) {
    //                     alert('Successfully deleted')
    //                     const remaining = allOrders.filter(myOrder => myOrder._id !== orderId);
    //                     setAllOrders(remaining);
    //                     setOperationSuccessful(true);
    //                     setTimeout(() => setOperationSuccessful(false), 5000)
    //                 }
    //             })
    //     }
    // }

    const approveOrder = (orderId) => {
        const confirmUpdate = window.confirm(
            "Are you sure you want to approve this order?"
        );
        const url = `https://clockroach-server.onrender.com/updateStatus/${orderId}`;
        if (confirmUpdate) {
            axios
                .put(url, {
                    status: "shipped",
                })
                .then((res) => {
                    console.log(res);
                    const findPackage = allOrders.find(
                        (order) => orderId === order._id
                    );
                    findPackage.orderStatus = "shipped";

                    const remaining = allOrders.filter(
                        (order) => order._id !== orderId
                    );

                    remaining.push(findPackage);
                    setAllOrders(remaining);
                    setOperationSuccessful(true);
                    setTimeout(() => setOperationSuccessful(false), 5000);
                    // window.location.reload();
                });
        }
    };

    const cancelOrder = (orderId) => {
        const confirmUpdate = window.confirm(
            "Are you sure you want to cancel this order?"
        );
        const url = `https://clockroach-server.onrender.com/updateStatus/${orderId}`;
        if (confirmUpdate) {
            axios
                .put(url, {
                    status: "cancelled",
                })
                .then((res) => {
                    console.log(res);
                    const findPackage = allOrders.find(
                        (order) => orderId === order._id
                    );
                    findPackage.orderStatus = "cancelled";

                    const remaining = allOrders.filter(
                        (order) => order._id !== orderId
                    );

                    remaining.push(findPackage);
                    setAllOrders(remaining);
                    setOperationSuccessful(true);
                    setTimeout(() => setOperationSuccessful(false), 5000);
                    // window.location.reload();
                });
        }
    };

    return (
        <div>
            <h1>Manage All Orders</h1>
            {operationSuccessful && (
                <Alert severity="success">Operation Successfull</Alert>
            )}
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
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {row._id}
                                </TableCell>
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell align="center">
                                    {row.orderStatus === "shipped" && (
                                        <p
                                            style={{
                                                backgroundColor: "#edf7ed",
                                                padding: "5px",
                                                borderRadius: "8px",
                                                width: "100%",
                                            }}
                                        >
                                            <CheckCircleIcon
                                                style={{
                                                    color: "#65ba68",
                                                    marginRight: "5px",
                                                }}
                                            ></CheckCircleIcon>
                                            {row.orderStatus}
                                        </p>
                                    )}
                                    {row.orderStatus === "pending" && (
                                        <p
                                            style={{
                                                backgroundColor: "#fff4e5",
                                                padding: "5px",
                                                borderRadius: "8px",
                                                width: "100%",
                                            }}
                                        >
                                            <WarningIcon
                                                style={{
                                                    color: "#ffa117",
                                                    marginRight: "5px",
                                                }}
                                            ></WarningIcon>
                                            {row.orderStatus}
                                        </p>
                                    )}
                                    {row.orderStatus === "cancelled" && (
                                        <p
                                            style={{
                                                backgroundColor: "#fdeded",
                                                padding: "5px",
                                                borderRadius: "8px",
                                                width: "100%",
                                            }}
                                        >
                                            <CancelIcon
                                                style={{
                                                    color: "#f06360",
                                                    marginRight: "5px",
                                                }}
                                            ></CancelIcon>
                                            {row.orderStatus}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {" "}
                                    <Button
                                        disabled={
                                            row.orderStatus === "cancelled"
                                        }
                                        onClick={() => {
                                            cancelOrder(row._id);
                                        }}
                                        style={{ backgroundColor: "#f44336" }}
                                        variant="contained"
                                    >
                                        X
                                    </Button>{" "}
                                </TableCell>
                                <TableCell align="center">
                                    {" "}
                                    <Button
                                        disabled={
                                            row.orderStatus === "cancelled" ||
                                            row.orderStatus === "shipped"
                                        }
                                        onClick={() => {
                                            approveOrder(row._id);
                                        }}
                                        style={{ backgroundColor: "#64dd17" }}
                                        variant="contained"
                                    >
                                        ✔
                                    </Button>{" "}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllOrders;
