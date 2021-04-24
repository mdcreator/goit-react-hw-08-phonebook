import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/contacts/contacts-operations';
import {
  getVisibleContacts,
  getLoading,
} from '../../redux/contacts/contacts-selectors';

import s from './ContactList.module.css';

export default function ContactList() {
  const isLoading = useSelector(getLoading);
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <>
      {isLoading ? <h2>Loading...</h2> : <h2>Contacts list:</h2>}
      <ul className={s.contactList}>
        {contacts.map(({ id, name, number }) => {
          return (
            <li className={s.contact} key={id}>
              <p>
                {name} : {number}
              </p>
              <button type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
