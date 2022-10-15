import React, {useEffect, useState} from 'react';
import {Contact} from './ContactListContainer';
import {toast} from 'react-toastify';
import {
  AddressGroup,
  customerService,
} from '../../../services/customer-service';
import {useEmail} from '../../../utils/hooks/customer-hooks';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {routes} from '../../../route-list';

export type ConfigureGroupContainerProps = {
  contacts: Contact[];
  checkedContacts: Contact[];
  userClickedClose: () => void;
  userClickedAddNewGroup: () => void;
  loading: boolean;
  isSelectingContacts: boolean;
  userClickedAddRemoveMembers: () => void;
  userSelectedContact: (contact: Contact) => void;
  userClickedDiscardChanges: () => void;
  groupName: string;
  onChangeGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userClickedSaveChanges: () => void;
  groupToEdit: AddressGroup | null;
  userClickedDeleteGroup: () => void;
  isEditingTitle: boolean;
  userClickedOnPencilIcon: () => void;
  onTitleBlur: () => void;
};

export const ConfigureGroupContainer =
  (Screen: React.VFC<ConfigureGroupContainerProps>) => () => {
    const [groupName, setGroupName] = useState<string>('');
    const [groupToEdit, setGroupToEdit] = useState<AddressGroup | null>(null);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [checkedContacts, setCheckedContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSelectingContacts, setIsSelectingContacts] =
      useState<boolean>(false);

    const email = useEmail();
    const history = useHistory();
    const match = useRouteMatch<{groupId?: string}>();

    const loadGroupToEdit = React.useCallback(async () => {
      if (match.params?.groupId && email) {
        try {
          setLoading(true);
          const result = await customerService.getAddressGroupById(
            email,
            match.params.groupId
          );
          setLoading(false);
          setGroupToEdit(result);
        } catch (e) {
          toast.error(e?.message || 'Something went wrong');
          setLoading(false);
          history.push(routes.USER__SETTINGS__ADDRESS_GROUP);
        }
      }
    }, [match.params, email]);

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

        setContacts(payload);
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    };

    const getInitialCheckedContacts = React.useCallback(() => {
      if (groupToEdit && contacts.length) {
        setCheckedContacts(() => {
          const members: Contact[] = [];
          groupToEdit.customerAddresses.forEach(memberId => {
            const member = contacts.find(contact => contact.id === memberId);
            if (member) {
              members.push(member);
            }
          });

          return members;
        });
      }
    }, [contacts, groupToEdit]);

    useEffect(() => {
      if (email) {
        loadEntries(email);
      }
    }, [email]);

    useEffect(() => {
      loadGroupToEdit();
    }, [loadGroupToEdit]);

    useEffect(() => {
      getInitialCheckedContacts();
    }, [getInitialCheckedContacts]);

    return (
      <Screen
        loading={loading}
        contacts={contacts}
        checkedContacts={checkedContacts}
        groupToEdit={groupToEdit}
        userClickedClose={() => {
          history.push(routes.USER__SETTINGS__ADDRESS_GROUP);
        }}
        userClickedAddNewGroup={() => {
          history.push(routes.USER__SETTINGS__ADDRESS_GROUP__ADD);
        }}
        userClickedAddRemoveMembers={() => {
          setIsSelectingContacts(true);
        }}
        userSelectedContact={contact => {
          setCheckedContacts(prev => {
            const isIncluded = prev.find(c => c.id === contact.id);
            if (isIncluded) {
              return prev.filter(ctc => ctc.id !== contact.id);
            }
            return [...prev, contact];
          });
        }}
        isSelectingContacts={isSelectingContacts}
        userClickedDiscardChanges={() => {
          if (groupToEdit) {
            getInitialCheckedContacts();
          } else {
            setCheckedContacts([]);
          }
          setIsSelectingContacts(false);
        }}
        groupName={groupName}
        onChangeGroupName={event => {
          setGroupName(event.target.value);
        }}
        userClickedSaveChanges={async () => {
          try {
            if (!email) return;
            setLoading(true);

            if (match.path === routes.USER__SETTINGS__ADDRESS_GROUP__ADD) {
              const payload = {
                name: groupName,
                customerAddresses: checkedContacts.map(contact => contact.id),
              };
              await customerService.createAddressGroup(email, payload);
              toast.success('Address group created.');
            } else {
              const payload = {
                name: groupName || groupToEdit?.name || '',
                customerAddresses: checkedContacts.map(contact => contact.id),
                id: match.params?.groupId || '',
              };
              await customerService.updateAddressGroupById(email, payload);
              toast.success('Address group updated successfully.');
            }
            setLoading(false);
            history.push(routes.USER__SETTINGS__ADDRESS_GROUP);
          } catch (error) {
            setLoading(false);
            toast.error(error?.message || 'Error saving group');
          }
        }}
        userClickedDeleteGroup={async () => {
          try {
            if (!email || !match.params?.groupId) return;
            setLoading(true);
            await customerService.deleteAddressGroupById(
              email,
              match.params.groupId
            );
            setLoading(false);
            toast.success('Group successfuly deleted.');
            history.push(routes.USER__SETTINGS__ADDRESS_GROUP);
          } catch (error) {
            setLoading(false);
            toast.error(error?.message || 'Error deleting group');
          }
        }}
        isEditingTitle={isEditingTitle}
        userClickedOnPencilIcon={() => {
          if (!groupToEdit) return;
          setGroupName(groupToEdit?.name);
          setIsEditingTitle(true);
        }}
        onTitleBlur={async () => {
          if (!email || !groupToEdit) return;
          try {
            const payload = {
              name: groupName,
              customerAddresses: checkedContacts.map(contact => contact.id),
              id: match.params?.groupId || '',
            };
            setLoading(true);
            await customerService.updateAddressGroupById(email, payload);
            setLoading(false);
            toast.success('Group title updated successfully.');
            setIsEditingTitle(false);
          } catch (error) {
            setLoading(false);
            toast.error(error?.message || 'Something went wrong');
          }
        }}
      />
    );
  };
