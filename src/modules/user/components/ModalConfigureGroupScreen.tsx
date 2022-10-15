import React from 'react';
import {
  ArrowLineLeftIcon,
  EditContactIcon,
  PencilUnderline,
  DeleteContactIcon,
  CheckBox,
  ActiveCheckBox,
} from '../../../assets/svg';
import Modal from 'react-modal';
import {ModalActionButton, ModalActionButtonText} from './ContactListSection';
import {DecreeText} from '../../core/DecreeText';
import {ConfigureGroupContainerProps} from '../containers/ConfigureGroupContainer';
import {useRouteMatch} from 'react-router-dom';
import {routes} from '../../../route-list';

type ModalGroupScreenProps = {
  isOpen: boolean;
} & ConfigureGroupContainerProps;

export const ModalConfigureGroupScreen = (props: ModalGroupScreenProps) => {
  const match = useRouteMatch();
  return (
    <Modal
      isOpen={props.isOpen}
      className="absolute bottom-0 w-screen overflow-auto bg-white h-[90%] z-20"
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center pt-7 px-5">
        <div className="flex flex-row w-full border-b border-gray pb-4 relative">
          <button className="w-8 h-8" onClick={() => props.userClickedClose()}>
            <ArrowLineLeftIcon fill="#324B6F" />
          </button>
          <div className="w-full flex items-center justify-center">
            <div className="max-w-[120px]">
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
                <DecreeText
                  size={24}
                  className="text-center text-blue-dark font-serif font-bold truncate"
                >
                  {props.groupName || props.groupToEdit?.name}
                </DecreeText>
              )}
            </div>
            <button
              className="pl-5"
              onClick={() => props.userClickedOnPencilIcon()}
            >
              <PencilUnderline />
            </button>
          </div>
        </div>
        <div className="flex pt-4 space-x-3">
          {props.isSelectingContacts ? (
            <>
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedDiscardChanges}
              >
                <ModalActionButtonText size={12}>
                  Discard Changes
                </ModalActionButtonText>
              </ModalActionButton>
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedSaveChanges}
              >
                <ModalActionButtonText size={12}>
                  Save Changes
                </ModalActionButtonText>
              </ModalActionButton>
            </>
          ) : (
            <>
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedAddRemoveMembers}
              >
                <EditContactIcon className="fill-current text-blue-dark group-hover:text-white" />
                <ModalActionButtonText size={12}>
                  Add / Remove
                </ModalActionButtonText>
              </ModalActionButton>
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedDeleteGroup}
              >
                <DeleteContactIcon className="stroke-current text-blue-dark group-hover:text-white" />
                <ModalActionButtonText size={12}>Delete</ModalActionButtonText>
              </ModalActionButton>
            </>
          )}
        </div>
        <DecreeText size={18} className="my-6 text-blue-dark">
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
    </Modal>
  );
};
