import clsx from 'clsx';
import React, {useState} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {
  CloseIcon,
  SelectIcon,
  UnfilledBluePlusIcon,
  DeleteContactIcon,
  CheckBox,
  ActiveCheckBox,
  PencilUnderline,
} from '../../../assets/svg';
import {routes} from '../../../route-list';
import {
  greetingCategories,
  weddingCategories,
} from '../../../utils/constants/store.contants';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import {DecreeText} from '../../core/DecreeText';
import {ConfigureGroupContainerProps} from '../containers/ConfigureGroupContainer';
import {AddressBookWrap} from './shared/AddressBookWrap';
import {HandleWindowResize} from '../../core/HandleWindowResize';
import {tabletWidth} from '../../../utils/constants/screen-width.constants';
import {ModalConfigureGroupScreen} from './ModalConfigureGroupScreen';

export const cardTypesData: {
  title: string;
  subItems: {id: string; text: string}[];
}[] = [
  {title: 'WEDDING INVITATIONS', subItems: weddingCategories},
  // {title: 'WEDDING COLLECTIONS', subItems: []},
  {title: 'PERSONAL STATIONERY', subItems: greetingCategories},
  {title: 'LIMITED EDITION STATIONERY', subItems: []},
];

export const ConfigureGroupScreen = (props: ConfigureGroupContainerProps) => {
  const [isTabletWidth, setIsTabletWidth] = useState(
    window.innerWidth >= tabletWidth
  );
  const match = useRouteMatch();

  if (props.loading) {
    return (
      <AddressBookWrap>
        <DecreeSpinner type="primary" />
      </AddressBookWrap>
    );
  }
  return (
    <AddressBookWrap>
      <HandleWindowResize
        onResize={() => setIsTabletWidth(window.innerWidth >= tabletWidth)}
      />
      <ModalConfigureGroupScreen {...props} isOpen={!isTabletWidth} />
      <div className="hidden tablet:block shadow-lg w-full p-8 relative">
        <div className="flex items-center justify-center space-x-2">
          {match.path === routes.USER__SETTINGS__ADDRESS_GROUP__ADD ||
          props.isEditingTitle ? (
            <input
              className="outline-none border-b-[1px] border-gold"
              autoFocus
              placeholder="Group name"
              value={props.groupName}
              onChange={props.onChangeGroupName}
              onBlur={() => props.onTitleBlur()}
            />
          ) : (
            <>
              <DecreeText
                size={23}
                className="text-center text-blue-dark truncate max-w-[200px]"
              >
                {props.groupName || props.groupToEdit?.name}
              </DecreeText>
              <button onClick={() => props.userClickedOnPencilIcon()}>
                <PencilUnderline />
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 my-4 ">
          <div>
            <div className="absolute right-8 top-8">
              <button onClick={props.userClickedClose}>
                <CloseIcon />
              </button>
            </div>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => props.userClickedAddRemoveMembers()}
            >
              <SelectIcon />
              <div className="text-sm text-blue-dark">SELECT</div>
            </div>
            <DecreeText size={14} className="my-6 text-blue-dark">
              {props.contacts.length} contacts
            </DecreeText>
            {props.contacts.length > 0 && (
              <div className="space-y-6">
                {props.contacts.map((contact, i) => {
                  if (props.isSelectingContacts) {
                    const isChecked = props.checkedContacts.find(
                      ctc => ctc.id === contact.id
                    );
                    return (
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        key={contact.id}
                        onClick={() => props.userSelectedContact(contact)}
                      >
                        {isChecked ? <ActiveCheckBox /> : <CheckBox />}
                        <DecreeText
                          size={18}
                          key={contact.name + i}
                          className="text-blue-dark"
                        >
                          {contact.name}
                        </DecreeText>
                      </div>
                    );
                  }
                  return (
                    <DecreeText
                      size={18}
                      key={contact.name + i}
                      className="text-blue-dark"
                    >
                      {contact.name}
                    </DecreeText>
                  );
                })}
              </div>
            )}
          </div>
          <div className="border-l border-gray px-8">
            <div className="grid grid-cols-3">
              <div
                className={clsx('space-y-6', {
                  'col-span-2': props.isSelectingContacts,
                })}
              >
                {props.isSelectingContacts ? (
                  <div className="flex items-center space-x-2">
                    <DecreeButton
                      mode="secondary"
                      className="bg-white"
                      onClick={props.userClickedDiscardChanges}
                    >
                      Discard Changes
                    </DecreeButton>
                    <DecreeButton
                      mode="primary"
                      onClick={props.userClickedSaveChanges}
                    >
                      Save Changes
                    </DecreeButton>
                  </div>
                ) : (
                  <div className="group">
                    <DecreeButton
                      mode="secondary"
                      onClick={props.userClickedAddRemoveMembers}
                      className="flex items-center space-x-2 bg-white group-hover:bg-blue-dark"
                    >
                      <UnfilledBluePlusIcon className=" fill-current text-blue-dark group-hover:text-white" />
                      <DecreeText
                        size={12}
                        className="flex group-hover:text-white whitespace-nowrap"
                      >
                        Add/remove members
                      </DecreeText>
                    </DecreeButton>
                  </div>
                )}

                <div className="group">
                  {props.groupToEdit && (
                    <DecreeButton
                      mode="secondary"
                      onClick={props.userClickedDeleteGroup}
                      className="flex items-center space-x-2 bg-white group-hover:bg-blue-dark"
                    >
                      <DeleteContactIcon className="fill-current text-blue-dark group-hover:text-white" />
                      <DecreeText
                        size={12}
                        className="flex group-hover:text-white whitespace-nowrap"
                      >
                        Delete Group
                      </DecreeText>
                    </DecreeButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AddressBookWrap>
  );
};
