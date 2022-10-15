import React, {useState} from 'react';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {AddressBookGroupContainerProps} from '../containers/AddressBookGroupContainer';
import {GroupSection} from './GroupSection';
import {AddressBookWrap} from './shared/AddressBookWrap';

export const AddressBookGroupScreen = (
  props: AddressBookGroupContainerProps
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  return (
    <AddressBookWrap userTypedOnSearch={e => setSearchTerm(e.target.value)}>
      {props.loading ? (
        <DecreeSpinner type="primary" />
      ) : (
        <GroupSection
          searchTerm={searchTerm}
          groups={props.groups}
          userClickedClose={props.userClickedClose}
          userClickedAddNewGroup={props.userClickedAddNewGroup}
          userClickedGroup={props.userClickedGroup}
        />
      )}
    </AddressBookWrap>
  );
};
