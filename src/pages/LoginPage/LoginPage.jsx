import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const credentials = {
      email: formData.get('email').trim(),
      password: formData.get('password'),
    };

    try {
      await login(credentials);
      const destination = location.state?.from?.pathname || '/contacts';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Неправильний email або пароль.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">CONTACTBOOK</p>
        <h1>З поверненням!</h1>
        <p className="subtitle">Увійди, щоб переглянути свої контакти.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />

        <label htmlFor="login-password">Пароль</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Вхід...' : 'Увійти'}
        </button>

        <p className="auth-footer">
          Ще немає акаунта? <Link to="/register">Реєстрація</Link>
        </p>
      </form>
    </main>
  );
}

LoginPage.propTypes = {};
