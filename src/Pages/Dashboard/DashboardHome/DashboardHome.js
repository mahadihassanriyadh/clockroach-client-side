import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import { useState } from "react";

const DashboardHome = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    useEffect(() => {
        const url = `https://clockroach-server.onrender.com/allOrders`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllOrders(data);
            });
    }, []);

    // load pending orders information
    useEffect(() => {
        const url = `https://clockroach-server.onrender.com/pendingOrders`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPendingOrders(data);
            });
    }, []);

    // load approved orders information
    useEffect(() => {
        const url = `https://clockroach-server.onrender.com/approvedOrders`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setApprovedOrders(data);
            });
    }, []);

    return (
        <Box>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={6} md={4}>
                    <Paper
                        elevation={8}
                        style={{
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                gutterBottom
                                component="div"
                            >
                                <CloudDoneRoundedIcon
                                    style={{
                                        color: "#2196f3",
                                        fontSize: "60px",
                                    }}
                                ></CloudDoneRoundedIcon>
                                Total Orders
                            </Typography>
                            <Typography
                                variant="h4"
                                gutterBottom
                                component="div"
                            >
                                {allOrders.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Paper
                        elevation={8}
                        style={{
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                gutterBottom
                                component="div"
                            >
                                <AutorenewIcon
                                    style={{
                                        color: "#fdd835",
                                        fontSize: "60px",
                                    }}
                                ></AutorenewIcon>
                                Pending Orders
                            </Typography>
                            <Typography
                                variant="h4"
                                gutterBottom
                                component="div"
                            >
                                {pendingOrders.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Paper
                        elevation={8}
                        style={{
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                gutterBottom
                                component="div"
                            >
                                <CheckCircleOutlineRoundedIcon
                                    style={{
                                        color: "#64dd17",
                                        fontSize: "60px",
                                    }}
                                ></CheckCircleOutlineRoundedIcon>
                                Approved Orders
                            </Typography>
                            <Typography
                                variant="h4"
                                gutterBottom
                                component="div"
                            >
                                {approvedOrders.length}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </Box>
    );
};

export default DashboardHome;
