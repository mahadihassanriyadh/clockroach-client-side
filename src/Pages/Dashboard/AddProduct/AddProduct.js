import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
        axios
            .post("https://clockroach-server.onrender.com/addProduct", data)
            .then((res) => {
                // console.log(res);
                if (res.data.insertedId) {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 5000);
                    reset();
                }
            });
    };
    return (
        <div className="placeOrder">
            {success && (
                <Alert severity="success">Product added successfully.</Alert>
            )}
            <h1 className="mt-5">Give Feedback</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control"
                    type="text"
                    {...register("productCode")}
                    placeholder="Product Code"
                    required
                />

                <input
                    className="form-control"
                    type="number"
                    {...register("price")}
                    placeholder="Price"
                    required
                />
                <input
                    className="form-control"
                    {...register("size")}
                    placeholder="Clock's size (ex. 10 inch)"
                    required
                />
                <input
                    className="form-control"
                    {...register("bodyMaterial")}
                    placeholder="Body Material"
                    required
                />
                <input
                    className="form-control"
                    {...register("category")}
                    placeholder="Category"
                    required
                />
                <textarea
                    className="form-control"
                    {...register("description")}
                    placeholder="Description"
                    required
                />
                <input
                    className="form-control"
                    type="url"
                    {...register("img")}
                    placeholder="Your Image Url"
                    required
                />
                <input className="btn btn-dark" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;
