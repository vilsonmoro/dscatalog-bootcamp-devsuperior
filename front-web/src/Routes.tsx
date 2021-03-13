import PrivateRoute from 'core/components/Routes/PrivateRoute';
import history from 'core/utils/history';
import Auth from 'pages/Auth';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/home';


const Routes = () => (
    
    <Router history={history}>
        <Navbar />
        <Switch>
             <Route path="/" exact>
                 <Home />
             </Route>
             
             <Route path="/products" exact>
                 <Catalog />
             </Route>

             <Route path="/products/:productId">
                 <ProductDetails />
             </Route>

             
             <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
             <Route path="/admin/auth">
                 <Auth />
             </Route>

             <Redirect from="/admin" to="/admin/products" exact/>
             <PrivateRoute path="/admin">                 
                 <Admin />
             </PrivateRoute>  
        </Switch>
    </Router>
);

export default Routes;