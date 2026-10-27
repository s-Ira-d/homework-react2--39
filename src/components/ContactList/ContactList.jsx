import PropTypes from 'prop-types';
import './ContactList.css';

export default function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty-contacts">Контактів поки немає.</p>;
  }

  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <li className="contact-item" key={contact.id}>
          <div className="contact-info">
            <span className="contact-avatar" aria-hidden="true">
              {contact.name.charAt(0).toUpperCase()}
            </span>

            <div>
              <p className="contact-name">{contact.name}</p>
              <a href={`tel:${contact.number}`}>{contact.number}</a>
            </div>
          </div>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(contact.id)}
            aria-label={`Видалити контакт ${contact.name}`}
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
