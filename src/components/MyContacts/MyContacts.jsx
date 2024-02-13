import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { addContact, deleteContact } from '../../redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';
import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';

import styles from './my-contacts.module.css';

const MyContacts = () => {
  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName || item.number === number;
    });

    return Boolean(dublicate);
  };

  const onAddContact = data => {
    if (isDublicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} is already in the list`
      );
    }

    const action = addContact(data);
    dispatch(action);
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onChangeFilter = ({ target }) => dispatch(setFilter(target.value));

  const items = contacts;

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={onChangeFilter} />
      <ContactList items={items} deleteContact={onDeleteContact} />
    </div>
  );
};

export default MyContacts;
