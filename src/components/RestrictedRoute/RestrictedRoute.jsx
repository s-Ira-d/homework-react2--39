import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';

export default function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Завантаження...</p>;

  return user ? <Navigate to="/contacts" replace /> : <Outlet />;
}

RestrictedRoute.propTypes = {};
