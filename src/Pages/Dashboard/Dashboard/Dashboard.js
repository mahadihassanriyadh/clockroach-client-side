import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import {
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import DashboardHome from '../DashboardHome/DashboardHome';
import AddAdmin from '../AddAdmin/AddAdmin';
import MyOrders from '../MyOrders/MyOrders';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import GiveReview from '../GiveReview/GiveReview';
import AddProduct from '../AddProduct/AddProduct';
import Payment from '../Payment/Payment';
import ManageAllProducts from '../ManageAllProducts/ManageAllProducts';


const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    let { path, url } = useRouteMatch();
    const { admin, logout, user } = useAuth();
    console.log(admin)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <NavLink style={{textDecoration: 'none', color: 'black'}} to="/"><Button color="inherit">Home</Button></NavLink>
            <NavLink style={{textDecoration: 'none', color: 'black'}} to="/products"><Button color="inherit">Products</Button></NavLink>
            <br />
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}`}><Button color="inherit">Dashboard</Button></NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/giveReview`}><Button color="inherit">Give Review</Button></NavLink>
            <br />
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/myOrders`}><Button color="inherit">My Orders</Button></NavLink>
            <br />
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/payment`}><Button color="inherit">Payment</Button></NavLink>
            <hr />
            {
                admin &&
                <Box>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to={`${url}/manageAllOrders`}><Button color="inherit">Manage All Orders</Button></NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to={`${url}/manageAllProducts`}><Button color="inherit">Manage All Products</Button></NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to={`${url}/addProduct`}><Button color="inherit">Add Product</Button></NavLink>
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to={`${url}/addAdmin`}><Button color="inherit">Add Admin</Button></NavLink>
                </Box>
            }
            <br />
            <Button onClick={logout} style={{backgroundColor: '#ffea00'}} color="inherit">LogOut</Button>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'black'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard of {user.displayName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              
          <Toolbar />
          <Switch>
            <Route exact path={path}>
                <DashboardHome></DashboardHome>
            </Route>
            <Route exact path={`${path}/myOrders`}>
                <MyOrders></MyOrders>
            </Route>
            <Route path={`${path}/giveReview`}>
                <GiveReview></GiveReview>
            </Route>
            <Route path={`${path}/payment`}>
                <Payment></Payment>
            </Route>
            <AdminRoute path={`${path}/addAdmin`}>
                <AddAdmin></AddAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/manageAllOrders`}>
                <ManageAllOrders></ManageAllOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/addProduct`}>
                <AddProduct></AddProduct>
            </AdminRoute>
            <AdminRoute path={`${path}/manageAllProducts`}>
                <ManageAllProducts></ManageAllProducts>
            </AdminRoute>
          </Switch>
            
          
        </Box>
      </Box>
      
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;