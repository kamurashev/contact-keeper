import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';
import Spiner from '../layout/Spinner';

const PrivateRoute = (props) => {
  const { loadUser, isAuthenticated, loading, token } = useContext(AuthContext);

  useEffect(
    () => loadUser(),
    // eslint-disable-next-line
    []
  );

  return token && loading ? (
    <Spiner />
  ) : isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to='/login' />
  );
};

export default PrivateRoute;
