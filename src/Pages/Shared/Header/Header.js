import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';

const Header = () => {
    // const { user, logout } = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{backgroundColor: "#212121"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link style={{textDecoration: 'none', color: 'white'}} to="/home">Clockroach</Link>
                    </Typography>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/products"><Button color="inherit">Explore</Button></Link>

                    {
                        // user?.email ?
                        //     <Box>
                        //         <NavLink style={{textDecoration: 'none', color: 'white'}} to="/dashboard">
                        //             <Button color="inherit">Dashboard</Button>
                        //         </NavLink>  
                        //         <Button style={{textDecoration: 'none', color: 'white'}} onClick={logout} color="inherit">Logout</Button>
                        //     </Box>
                        //     :
                        <NavLink style={{textDecoration: 'none', color: 'white'}} to="/login">
                            <Button color="inherit">Login</Button>
                        </NavLink>                            

                    }

                    {/* {
                        user?.email &&
                        <small>
                            <NavLink style={{ textDecoration: 'none', color: 'white'}} to="/">
                        Logged in as { user?.displayName }
                            </NavLink>
                        </small>
                    } */}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;