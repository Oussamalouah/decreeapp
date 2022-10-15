import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../route-list';
import {
  AddressGroup,
  customerService,
} from '../../../services/customer-service';
import {useEmail} from '../../../utils/hooks/customer-hooks';

export type AddressBookGroupContainerProps = {
  userClickedClose: () => void;
  userClickedAddNewGroup: () => void;
  groups: AddressGroup[];
  loading: boolean;
  userClickedGroup: (group: AddressGroup) => void;
};

export const AddressBookGroupContainer = (
  Screen: React.VFC<AddressBookGroupContainerProps>
) => {
  return () => {
    const [groups, setGroups] = useState<AddressGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const history = useHistory();
    const email = useEmail();

    const loadGroups = async (email: string) => {
      setLoading(true);
      const result = await customerService.getAddressesGroups(email);
      setGroups(result);
      setLoading(false);
    };

    useEffect(() => {
      if (email) {
        loadGroups(email);
      }
    }, [email]);

    return (
      <Screen
        userClickedClose={() =>
          history.push(routes.USER__SETTING__ADDRESS_BOOK)
        }
        userClickedAddNewGroup={() => {
          history.push(routes.USER__SETTINGS__ADDRESS_GROUP__ADD);
        }}
        groups={groups}
        loading={loading}
        userClickedGroup={group => {
          history.push(routes.USER__SETTINGS__ADDRESS_GROUP__EDIT(group.id));
        }}
      />
    );
  };
};
