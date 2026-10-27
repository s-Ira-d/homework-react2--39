import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import './RegisterPage.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const credentials = {
      name: data.get('name').trim(),
      email: data.get('email').trim(),
      password: data.get('password'),
    };

    try {
      await register(credentials);
      navigate('/contacts', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Не вдалося зареєструватися.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">CONTACTBOOK</p>
        <h1>Створи акаунт</h1>
        <p className="subtitle">Зберігай контакти в одному зручному місці.</p>

        <label htmlFor="register-name">Ім'я</label>
        <input
          id="register-name"
          name="name"
          type="text"
          placeholder="Твоє ім'я"
          autoComplete="name"
          minLength={2}
          maxLength={50}
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="register-password">Пароль</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Мінімум 7 символів"
          autoComplete="new-password"
          minLength={7}
          required
        />

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Реєстрація...' : 'Зареєструватися'}
        </button>

        <p className="auth-footer">
          Уже маєш акаунт? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </main>
  );
}

RegisterPage.propTypes = {};
