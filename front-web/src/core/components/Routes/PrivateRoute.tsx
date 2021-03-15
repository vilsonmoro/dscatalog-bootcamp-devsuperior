import { isAuthenticated, Role, isAllowedByRole } from 'core/utils/auth';
import React from 'react';
import { Redirect, Route } from 'react-router';

type Props = {
  children: React.ReactNode;
  path: string;
  allowedRoutes?: Role[];
}

function PrivateRoute({ children, path, allowedRoutes }: Props) {
  return (
    <Route
      path={path}
      render={({ location }) => {
        if (!isAuthenticated()) {
          return (isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/auth/login",
                state: { from: location }
              }}
            />
          ))
        } else if(isAuthenticated() && !isAllowedByRole(allowedRoutes) ){
          return(             
            <Redirect
              to={{ pathname: "/admin" }}           
            />
          )
        }
        return children;
      }}      
    />
  );
}
export default PrivateRoute;

