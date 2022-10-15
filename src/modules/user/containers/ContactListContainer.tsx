import FuzzySearch from 'fuzzy-search';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {routes} from '../../../route-list';
import {customerService} from '../../../services/customer-service';
import {useEmail} from '../../../utils/hooks/customer-hooks';

export type ContactListSectionProps = {
  contacts: Contact[];
  groupSelectedContacts: Contact[];
  selectedContact: Contact | null;
  totalAmountOfContacts: number;
  activeLetter: string;
  loading: boolean;
  isSelectActive: boolean;
  isGroupContactModalOpen: boolean;
  userClickedLetter: (letter: string) => void;
  userClickedSelect: () => void;
  userClickedContact: (contact: Contact) => void;
  userClickedGroupedContact: (contact: Contact) => void;
  userClickedBack: () => void;
  userClickedClear: () => void;
  userClickedGroupedContactNext: () => void;
  userClickedBackFromGroupContactMobile: () => void;
  userClickedDeleteContact: () => Promise<void>;
  userClickedEditContact: () => void;
};

export type Contact = {
  name: string;
  birthday: string;
  anniversary: string;
  group?: string;
  id: string;
};

export const ContactListContainer =
  (Screen: React.FC<ContactListSectionProps>) =>
  (props: {searchTerm: string}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [activeLetter, setActiveLetter] = useState('#');
    const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] =
      useState<Contact | null>(null);
    const [isSelectActive, setIsSelectActive] = useState(false);
    const [groupSelectedContacts, setGroupSelectedContacts] = useState<
      Contact[]
    >([]);
    const [isGroupContactMobileOpen, setIsGroupContactMobileOpen] =
      useState(false);

    const contactSearcher = new FuzzySearch(contacts, ['name'], {
      caseSensitive: false,
    });

    useEffect(() => {
      const searched = contactSearcher.search(props.searchTerm);
      if (activeLetter === '#') {
        setActiveContacts(searched);
      } else {
        const filteredContacts = searched.filter(contact =>
          _.startsWith(contact.name.toLowerCase(), activeLetter.toLowerCase())
        );
        setActiveContacts(filteredContacts);
      }
    }, [activeLetter, props.searchTerm]);

    // the email address of the authenticated user
    const email = useEmail();

    const loadEntries = async (email: string) => {
      try {
        setLoading(true);

        const response = await customerService.getCustomerAddressBookEntries(
          email
        );
        const payload: Contact[] = response.map(entry => {
          let birthday = 'N/A';
          let anniversary = 'N/A';
          entry.specialDates.forEach(specialDate => {
            if (specialDate.type.toLowerCase() === 'birthday') {
              birthday = specialDate.month + ' ' + specialDate.day;
            }
            if (specialDate.type.toLowerCase() === 'anniversary') {
              anniversary = specialDate.month + ' ' + specialDate.day;
            }
          });
          return {
            id: entry.id,
            name: entry.firstName + ' ' + entry.lastName,
            birthday: birthday,
            anniversary: anniversary,
            group: 'family',
          } as Contact;
        });

        setActiveContacts(payload);
        setContacts(payload);
        setSelectedContact(null);
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    };

    React.useEffect(() => {
      if (email) {
        loadEntries(email);
      }
    }, [email]);
    // end :: get contacts from the api

    useEffect(() => {
      setSelectedContact(null);
      setGroupSelectedContacts([]);
    }, [activeLetter, isSelectActive]);

    return (
      <Screen
        userClickedDeleteContact={async () => {
          if (selectedContact) {
            const id = selectedContact.id;
            try {
              setLoading(true);

              await customerService.deleteCustomerAddressBookEntry(id);
              toast.success('The contact has been deleted!');
              await loadEntries(email!);

              setLoading(false);
            } catch (e) {
              toast.error('Something went wrong. Please try again later.');
            }
          }
        }}
        userClickedEditContact={() => {
          history.push(
            routes.USER__SETTING__ADDRESS_BOOK__EDIT(selectedContact!.id)
          );
        }}
        loading={loading}
        contacts={activeContacts}
        groupSelectedContacts={groupSelectedContacts}
        isSelectActive={isSelectActive}
        selectedContact={selectedContact}
        totalAmountOfContacts={contacts.length}
        activeLetter={activeLetter}
        isGroupContactModalOpen={isGroupContactMobileOpen}
        userClickedLetter={setActiveLetter}
        userClickedBack={() => {
          setSelectedContact(null);
        }}
        userClickedClear={() => {
          setGroupSelectedContacts([]);
        }}
        userClickedContact={contact => {
          if (contact.name === selectedContact?.name) {
            setSelectedContact(null);
          } else {
            setSelectedContact(contact);
          }
        }}
        userClickedSelect={() => setIsSelectActive(!isSelectActive)}
        userClickedGroupedContact={contact => {
          const isUserSelected = groupSelectedContacts.some(
            groupContact => groupContact.name === contact.name
          );

          if (isUserSelected) {
            setGroupSelectedContacts(
              groupSelectedContacts.filter(
                groupContact => groupContact.name !== contact.name
              )
            );
          } else {
            setGroupSelectedContacts([...groupSelectedContacts, contact]);
          }
        }}
        userClickedGroupedContactNext={() => {
          setIsGroupContactMobileOpen(true);
        }}
        userClickedBackFromGroupContactMobile={() => {
          setIsGroupContactMobileOpen(false);
        }}
      />
    );
  };
