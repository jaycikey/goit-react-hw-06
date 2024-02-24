import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact } from "../redux/contactsSlice";
import { setFilter } from "../redux/filtersSlice";
import { ContactList } from "./ContactList/ContactList";
import { ContactForm } from "./ContactForm/ContactForm";
import { SearchBar } from "./SearchBox/SearchBar";

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters);

  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleSetFilter = (value) => {
    dispatch(setFilter(value));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBar text={filter} onChange={handleSetFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};
