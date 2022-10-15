import React from 'react';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeText} from '../../core/DecreeText';
import {ProfileProps} from '../containers/ProfileContainer';
import {ProfilePageWrapper} from './shared/ProfilePageWrapper';
import {ProfileSectionWrapper} from './shared/ProfileSectionWrapper';

/**
 * Displays a wrapped components around ProfileSectionWrapper for the Profile Screen
 * @param user
 * @param props
 * @constructor
 */
export const ProfileScreen: React.FC<ProfileProps> = ({user, ...props}) => {
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`;
  return (
    <ProfilePageWrapper
      title={displayName}
      loading={props.loading}
      userClickedClose={props.userClickedClose}
    >
      {/*fillers, TODO need to refactor when implementing update logic*/}
      <ProfileSectionWrapper
        title="Profile"
        actions={
          <DecreeButton
            key="edit"
            className="px-5"
            onClick={props.userClickedEdit}
          >
            Edit
          </DecreeButton>
        }
      >
        <DecreeText size={18}>{displayName}</DecreeText>
        <DecreeText size={18}>{user?.email}</DecreeText>
        <DecreeText size={18}>
          {user?.defaultAddress?.address1
            ? user?.defaultAddress?.address1 + ', '
            : ''}
          {user?.defaultAddress?.city || ''}
        </DecreeText>
        <DecreeText size={18}>{user?.defaultAddress?.country}</DecreeText>
      </ProfileSectionWrapper>

      <ProfileSectionWrapper
        title="Shipping Address"
        /*
         * for now the user can only have a single address so the add button should only appear
         * if the user has no address yet the edit button should only appear if the user has one
         */
        actions={
          (!user?.defaultAddress && (
            <DecreeButton
              key="add"
              className="px-5"
              onClick={props.userClickedOnCreateAddress}
            >
              Add
            </DecreeButton>
          )) || (
            <DecreeButton
              key="edit"
              className="px-5"
              onClick={props.userClickedOnEditAddress}
            >
              Edit
            </DecreeButton>
          )
        }
      >
        {!user?.defaultAddress && (
          <DecreeText size={18}>You don't have any saved addresses</DecreeText>
        )}
        {user?.defaultAddress && (
          <div>
            <DecreeText size={18}>{user?.defaultAddress?.address1}</DecreeText>
            <DecreeText size={18}>{user?.defaultAddress?.address2}</DecreeText>
            <DecreeText size={18}>{user?.defaultAddress?.city}</DecreeText>
            <DecreeText size={18}>{user?.defaultAddress?.country}</DecreeText>
          </div>
        )}
      </ProfileSectionWrapper>

      {/**
       * removing payment methods for now as discussed
       */}
      {/* <ProfileSectionWrapper
        title="Payment Methods"
        actions={<DecreeButton className="px-5">Add</DecreeButton>}
      >
        <DecreeText size={18}>You have no saved cards.</DecreeText>
      </ProfileSectionWrapper> */}

      <ProfileSectionWrapper
        title="Email Preferences"
        // removing this for now [DEC-159]
        // actions={<DecreeButton className="px-5">Edit</DecreeButton>}
      >
        <DecreeText size={18}>
          You have {!user?.acceptsMarketing && 'not'} subscribed to Decree
          emails
        </DecreeText>
      </ProfileSectionWrapper>
      <ProfileSectionWrapper
        title="My Address Book"
        actions={[
          <DecreeButton
            className="px-5"
            // pushes the route for the address book
            onClick={props.userClickedEditAddressBook}
          >
            Edit
          </DecreeButton>,
        ]}
      >
        You have {props.addressLength} contacts
      </ProfileSectionWrapper>
    </ProfilePageWrapper>
  );
};
