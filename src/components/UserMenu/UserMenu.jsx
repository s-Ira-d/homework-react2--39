import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.css';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="user-menu">
      <span>{user?.email}</span>
      <button type="button" onClick={handleLogout}>
        Вийти
      </button>
    </div>
  );
}

UserMenu.propTypes = {};
