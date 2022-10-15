import React, {useState} from 'react';
import {ContactListContainer} from '../containers/ContactListContainer';
import {ContactListSection} from './ContactListSection';
import {AddressBookWrap} from './shared/AddressBookWrap';

const ContactList = ContactListContainer(ContactListSection);

export const AddressBookScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <AddressBookWrap
      userTypedOnSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      }}
    >
      <ContactList searchTerm={searchTerm} />
    </AddressBookWrap>
  );
};
