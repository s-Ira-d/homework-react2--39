import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import { useAuth } from '../../context/AuthContext';
import UserMenu from '../UserMenu/UserMenu';

export default function Navigation() {
  const { user } = useAuth();

  return (
    <header className="header">
      <NavLink to="/" className="brand">
        ContactBook
      </NavLink>

      <nav className="navigation">
        {user ? (
          <>
            <NavLink to="/contacts">Контакти</NavLink>
            <UserMenu />
          </>
        ) : (
          <>
            <NavLink to="/register">Реєстрація</NavLink>
            <NavLink to="/login">Увійти</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

Navigation.propTypes = {};
