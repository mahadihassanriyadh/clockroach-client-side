import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";

const GiveReview = () => {
    const { register, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
        axios
            .post("https://clockroach-server.onrender.com/giveReview", data)
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
                <Alert severity="success">
                    Your review added successfully.
                </Alert>
            )}
            <h1 className="mt-5">Give Feedback</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control"
                    {...register("name")}
                    placeholder="Your Name"
                    required
                />
                <input
                    className="form-control"
                    type="number"
                    {...register("star")}
                    placeholder="Rating (0-5)"
                    required
                />
                <textarea
                    className="form-control"
                    {...register("review")}
                    placeholder="Review"
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

export default GiveReview;
