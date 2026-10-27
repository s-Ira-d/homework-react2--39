import PropTypes from 'prop-types';
import './ContactForm.css';

export default function ContactForm({ onAdd }) {
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    onAdd({
      name: data.get('name').trim(),
      number: data.get('number').trim(),
    });

    form.reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Ім'я контакту</label>
      <input
        id="contact-name"
        name="name"
        placeholder="Наприклад, Олена"
        minLength={2}
        required
      />

      <label htmlFor="contact-number">Номер телефону</label>
      <input
        id="contact-number"
        name="number"
        type="tel"
        placeholder="+380..."
        required
      />

      <button type="submit">+ Додати контакт</button>
    </form>
  );
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
