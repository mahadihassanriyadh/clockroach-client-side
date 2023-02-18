import { Alert, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "./PlaceOrder.css";

const PlaceOrder = () => {
    const { productId } = useParams();
    const { user } = useAuth();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [orderItem, setOrderItem] = useState({});
    const url = `https://clockroach-server.onrender.com/products/${productId}`;
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setOrderItem(data);
            });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        if (data.name !== "" && data.email !== "") {
            axios
                .post("https://clockroach-server.onrender.com/placeOrder", data)
                .then((res) => {
                    // console.log(res);
                    if (res.data.insertedId) {
                        setOrderSuccess(true);
                        setTimeout(() => setOrderSuccess(false), 10000);

                        reset();
                    }
                });
        }
    };
    return (
        <>
            <Header></Header>
            <Container>
                <Grid
                    className="mt-3"
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={12} md={6}>
                        <img
                            style={{ width: "75%" }}
                            src={orderItem.img}
                            alt=""
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <p className="text-start mb-0">
                            <span className="fw-bold">Size: </span>
                            {orderItem.size}
                        </p>
                        <p className="text-start mb-0">
                            <span className="fw-bold">Product Code: </span>
                            {orderItem.productCode}
                        </p>
                        <p className="text-start mb-0">
                            <span className="fw-bold">Category: </span>
                            {orderItem.category}
                        </p>
                        <p className="text-start mb-0">
                            <span className="fw-bold">Product Material: </span>
                            {orderItem.bodyMaterial} body
                        </p>
                        <p className="text-start text-justify">
                            <span className="fw-bold"></span>
                            {orderItem.description}
                        </p>
                    </Grid>
                </Grid>
                <div className="placeOrder">
                    <h1 className="mt-3">Place an Order</h1>
                    <h4 className="text-danger">
                        Subtoal: {orderItem.price} BDT
                    </h4>
                    {orderSuccess && (
                        <Alert sx={{ margin: 3 }} severity="success">
                            Your order has been placed successfully.
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className="form-control"
                            {...register("productId")}
                            placeholder="productId"
                            required
                            defaultValue={productId}
                            readOnly
                        />
                        <input
                            defaultValue={user.displayName}
                            className="form-control"
                            type="text"
                            {...register("name")}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            defaultValue={user.email}
                            className="form-control"
                            type="email"
                            {...register("email")}
                            placeholder="Email"
                            required
                        />
                        {errors.email && (
                            <span className="error">
                                This field is required
                            </span>
                        )}
                        <input
                            className="form-control"
                            type="tel"
                            {...register("phone")}
                            placeholder="Phone No."
                            required
                        />
                        <input
                            className="form-control"
                            type="text"
                            {...register("district")}
                            placeholder="District"
                            required
                        />
                        <textarea
                            className="form-control"
                            {...register("address")}
                            placeholder="Address"
                            required
                        />
                        <input
                            defaultValue={new Date().toLocaleString()}
                            className="form-control"
                            type=""
                            {...register("time")}
                            placeholder="Time"
                            required
                            readOnly
                        />
                        <input className="btn btn-dark" type="submit" />
                    </form>
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default PlaceOrder;
