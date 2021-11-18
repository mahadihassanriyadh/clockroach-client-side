import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';


const ContactUs = () => {
    const [contactUsInfo, setContactUsInfo] = useState({});
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...contactUsInfo };
        newInfo[field] = value;
        console.log(newInfo);
        setContactUsInfo(newInfo);
    }

    const handleBookingSubmit = e => {
        // send to the server
        fetch('https://rocky-reef-73687.herokuapp.com/contactUs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contactUsInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSubmissionSuccess(true);
                    setTimeout(()=>setSubmissionSuccess(false), 5000)
                }
            });

        e.preventDefault();
    }
    return (
        <Container>
            <Typography id="transition-modal-title" variant="h4" sx={{fontWeight: 500, mt: 10}}>
                Contact Us
            </Typography>
            {
                submissionSuccess &&                         <Alert sx={{ width: '90%', margin: 'auto'}} severity="success">Sumbission successful</Alert>
            }
                <Box>

                    <form onSubmit={handleBookingSubmit}>

                        <TextField
                            required
                            label="Name"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="name"
                            onBlur={handleOnBlur}
                            // defaultValue={user.displayName}
                            size="small"
                        />
                        <TextField
                            required
                            label="Email"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="email"
                            onBlur={handleOnBlur}
                            // defaultValue={user.email}
                            size="small"
                        />
                        <TextField
                            required
                            label="Phone no."
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="phone"
                            onBlur={handleOnBlur}
                            size="small"
                    />
                        <TextField
                            id="outlined-multiline-static"
                            label="Query"
                            name="query"
                            sx={{ width: '90%', m: 1 }}
                            onBlur={handleOnBlur}
                            multiline
                            rows={4}
                    />
                    <br />
                    <Button type="submit" variant="contained" style={{ backgroundColor: 'black' }}  sx={{ color: '#ffeb3b'}}>Submit</Button>
                    </form>
                </Box>
        </Container>
    );
};

export default ContactUs;