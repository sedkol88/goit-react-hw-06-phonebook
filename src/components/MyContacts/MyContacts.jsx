import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import styles from './my-contacts.module.css';

const MyContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('my-contacts'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName || item.number === number;
    });

    return Boolean(dublicate);
  };

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} is already in the list`
      );
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedfilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedfilter);
    });

    return filteredContacts;
  };

  const items = getFilteredContacts();

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} />
      <ContactList items={items} deleteContact={deleteContact} />
    </div>
  );
};

export default MyContacts;
