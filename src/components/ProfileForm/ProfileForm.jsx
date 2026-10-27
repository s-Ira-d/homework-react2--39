import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import './ProfileForm.css';

export default function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setMessage('');
    setError('');
    setSaving(true);

    try {
      await updateUser({
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
      });

      setMessage('Профіль оновлено.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Не вдалося оновити профіль. Перевір API.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="profile-name">Ім'я користувача</label>
      <input
        id="profile-name"
        name="name"
        defaultValue={user?.name || ''}
        minLength={2}
        required
      />

      <label htmlFor="profile-email">Email користувача</label>
      <input
        id="profile-email"
        name="email"
        type="email"
        defaultValue={user?.email || ''}
        required
      />

      <button type="submit" disabled={saving}>
        {saving ? 'Збереження...' : 'Оновити профіль'}
      </button>

      {message && <p role="status">{message}</p>}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

ProfileForm.propTypes = {};
