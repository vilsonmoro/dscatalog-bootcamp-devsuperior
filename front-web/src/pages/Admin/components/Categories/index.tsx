import React from 'react';
import { Route, Switch } from 'react-router';
import ListCategories from './List';

const Categories = () => {
    return(
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <ListCategories />
                </Route>
               <Route path="/admin/categories/:categoryId">
                    Form
                </Route>
            </Switch>
        </div>
    )
}

export default Categories;