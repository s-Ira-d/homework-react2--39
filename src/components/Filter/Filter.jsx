import PropTypes from 'prop-types';
import './Filter.css';

export default function Filter({ value, onChange }) {
  return (
    <div className="filter">
      <label htmlFor="contact-filter">Пошук контактів</label>
      <input
        id="contact-filter"
        type="search"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder="Введи ім'я або номер..."
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
