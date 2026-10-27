import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
import './ContactsPage.css';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

export default function ContactsPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/contacts');
      setContacts(data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Не вдалося завантажити контакти.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleAdd = async contact => {
    setError('');

    try {
      const { data } = await api.post('/contacts', contact);
      setContacts(previous => [...previous, data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Не вдалося додати контакт.');
    }
  };

  const handleDelete = async id => {
    setError('');

    try {
      await api.delete(`/contacts/${id}`);
      setContacts(previous => previous.filter(contact => contact.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Не вдалося видалити контакт.');
    }
  };

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <main className="contacts-page">
      <section className="contacts-heading">
        <p className="eyebrow">ТВОЇ КОНТАКТИ</p>
        <h1>Книга контактів</h1>
        <p>
          Вітаємо{user?.name ? `, ${user.name}` : ''}! Керуй контактами в одному
          місці.
        </p>
      </section>

      <div className="contacts-layout">
        <section className="contacts-panel">
          <h2>Новий контакт</h2>
          <ContactForm onAdd={handleAdd} />
          <section className="contacts-panel">
            <h2>Мій профіль</h2>
            <ProfileForm />
          </section>
        </section>

        <section className="contacts-panel">
          <div className="contacts-title">
            <h2>Мої контакти</h2>
            <span>{contacts.length}</span>
          </div>

          <Filter value={filter} onChange={setFilter} />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          {loading ? (
            <p>Завантаження контактів...</p>
          ) : (
            <ContactList contacts={filteredContacts} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </main>
  );
}

ContactsPage.propTypes = {};
