import {
    Alert,
    Button,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();
    const [operationSuccessful, setOperationSuccessful] = useState(false);
    useEffect(() => {
        const url = `https://clockroach-server.onrender.com/myOrders?email=${user.email}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setMyOrders(data));
    }, []);
    const deleteOrder = (orderId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to cancel this order?"
        );
        const url = `https://clockroach-server.onrender.com/placeOrder/${orderId}`;
        if (confirmDelete) {
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert("Successfully deleted");
                        const remaining = myOrders.filter(
                            (myOrder) => myOrder._id !== orderId
                        );
                        setMyOrders(remaining);
                        setOperationSuccessful(true);
                        setTimeout(() => setOperationSuccessful(false), 5000);
                    }
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
                    const findPackage = myOrders.find(
                        (order) => orderId === order._id
                    );
                    findPackage.orderStatus = "cancelled";

                    const remaining = myOrders.filter(
                        (order) => order._id !== orderId
                    );

                    remaining.push(findPackage);
                    setMyOrders(remaining);
                    setOperationSuccessful(true);
                    setTimeout(() => setOperationSuccessful(false), 5000);
                    // window.location.reload();
                });
        }
    };
    return (
        <div>
            <h1>Total Orders: {myOrders.length}</h1>
            {operationSuccessful && (
                <Alert severity="success">Operation Successfull</Alert>
            )}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Order Status</TableCell>
                            <TableCell align="center">Cancel Order</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myOrders.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
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
                                            row.orderStatus === "shipped" ||
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrders;
