import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postContact } from '../../redux/contacts/contacts-operations';

import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = ({ target }) => {
    setName(target.value.trimLeft());
  };

  const handleNumberChange = ({ target }) => {
    setNumber(target.value.trimLeft());
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (name === '') {
      alert('Please add name');
      return;
    }
    if (number === '') {
      alert('Please add phone number');
      return;
    }
    dispatch(postContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleOnSubmit}>
      <div className={s.formField}>
        <label className={s.formLabel}>Name</label>
        <input
          className={s.formInput}
          type="text"
          placeholder="Rosie Simpson"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div className={s.formField}>
        <label className={s.formLabel}>Number</label>
        <input
          className={s.formInput}
          type="text"
          placeholder="459-12-56"
          name="number"
          value={number}
          onChange={handleNumberChange}
        />
      </div>

      <button type="submit">Add contact</button>
    </form>
  );
}
