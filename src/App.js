import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Register from './Pages/Login/Register/Register';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/home">
                <Home></Home>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/register">
                <Register></Register>
            </Route>
            <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
            </PrivateRoute>
            </Switch>
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
