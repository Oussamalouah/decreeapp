import React from 'react';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../route-list';

export type AddressBookContainerProps = {
  userClickedClose: () => void;
};

export const AddressBookContainer = (
  Screen: React.VFC<AddressBookContainerProps>
) => {
  return () => {
    const history = useHistory();

    return <Screen userClickedClose={() => history.push(routes.HOME)} />;
  };
};
