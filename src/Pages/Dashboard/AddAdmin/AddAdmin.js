import { Alert, Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';


const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const { user } = useAuth();
    const [success, setSuccess] = useState(false);
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        e.preventDefault();
        const toBeAdmin = { email };
        fetch(`http://localhost:5000/users/admin?email=${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(toBeAdmin)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setSuccess(true);
                    setTimeout(()=>setSuccess(false), 5000)
                }
            })
    }
    return (
        <div>
            {
                success &&
                <Alert severity="success">Successfully added { email } as an admin.</Alert>
            }
            <h2>Make An Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField sx={{ width: '50%' }} type="email" label="Email" variant="standard" onBlur={handleOnBlur} />
                <Button style={{backgroundColor: 'black', color: 'white'}} sx={{marginTop: '12px'}} type="submit" variant="contained">Make Admin</Button>
            </form>
        </div>
    );
};

export default AddAdmin;