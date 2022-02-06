import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import phoneBookContext from "./context/phoneBookContext";
import ContactForm from "./components/contactForm";
import Filter from "./components/filter";
import ContactList from "./components/contactList";

import {
  GlobalStyle,
  MainTitle,
  SecondaryTitle,
  PhonebookWrap,
} from "./App.styled";

function App() {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts ?? [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (evt) => {
    setFilter(evt.target.value);
  };

  const getSubmitForm = (name, number) => {
    const normalazedFind = name.toLowerCase();

    const isName = contacts.find(
      (contact) => contact.name.toLowerCase() === normalazedFind
    );
    if (isName) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts([{ name, number, id: nanoid(5) }, ...contacts]);
  };

  const deleteName = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <phoneBookContext.Provider
      value={{
        contacts,
        filter,
        onDeleteName: deleteName,
      }}
    >
      <GlobalStyle />
      <PhonebookWrap>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm submitForm={getSubmitForm} />
        <SecondaryTitle>Contacts</SecondaryTitle>
        <Filter handleChange={handleChange} filter={filter} />
        <ContactList />
      </PhonebookWrap>
    </phoneBookContext.Provider>
  );
}

export default App;
