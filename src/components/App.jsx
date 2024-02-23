import { ContactList } from "./ContactList/ContactList";
import items from "./contacts.json";
import styles from "./App.module.css";
import { SearchBar } from "./SearchBox/SearchBar";
import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";

export const App = () => {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : items;
  });

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prev) => {
      return [...prev, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prev) => {
      return prev.filter((item) => item.id !== contactId);
    });
  };

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBar text={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};
