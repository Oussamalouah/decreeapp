import React, {useState} from 'react';
import Modal from 'react-modal';
import {
  ArrowLineLeftIcon,
  CloseCircleIcon,
  DeleteContactIcon,
  EditContactIcon,
  OpenCircleIcon,
  SendCardsIcon,
} from '../../../assets/svg';
import {DecreeText} from '../../core/DecreeText';
import {Contact} from '../containers/ContactListContainer';
import {cardTypesData} from './ConfigureGroupScreen';
import {ModalActionButton, ModalActionButtonText} from './ContactListSection';

type ModalSelectedContactMobileProps = {
  isOpen?: boolean;
  groupSelectedContacts: Contact[];
  userClickedBack?: () => void;
};

export const ModalGroupSelectedContacts = ({
  isOpen = false,
  ...props
}: ModalSelectedContactMobileProps) => {
  const [activeDropdown, setActiveDropdown] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownChange = (payload: boolean, title: string) => {
    setActiveDropdown(prev => ({...prev, [title]: payload}));
  };

  return (
    <Modal
      isOpen={isOpen}
      className="absolute bottom-0 w-screen overflow-auto bg-white h-[90%] z-20"
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center pt-7 px-5">
        <div className="w-full border-b border-gray pb-4 relative">
          <div className="absolute w-8 h-8">
            <button onClick={props.userClickedBack}>
              <ArrowLineLeftIcon fill="#324B6F" />
            </button>
          </div>
          <DecreeText
            size={24}
            className="text-center text-blue-dark font-serif font-bold"
          >
            {props.groupSelectedContacts.length} Contacts
          </DecreeText>
        </div>
        <div className="flex pt-4 justify-between">
          <ModalActionButton className="bg-white">
            <SendCardsIcon className="fill-current text-blue-dark group-hover:text-white" />
            <ModalActionButtonText size={12}>Send Cards</ModalActionButtonText>
          </ModalActionButton>
          <ModalActionButton className="bg-white">
            <EditContactIcon className="fill-current text-blue-dark group-hover:text-white" />
            <ModalActionButtonText size={12}>Edit</ModalActionButtonText>
          </ModalActionButton>
          <ModalActionButton className="bg-white">
            <DeleteContactIcon className="stroke-current text-blue-dark group-hover:text-white" />
            <ModalActionButtonText size={12}>Delete</ModalActionButtonText>
          </ModalActionButton>
        </div>
        <div className="py-4 space-y-2">
          {cardTypesData.map(cardType => {
            return (
              <div
                className="flex items-start space-x-4 my-2"
                key={cardType.title}
              >
                {activeDropdown[cardType.title] ? (
                  <button
                    onClick={() => handleDropdownChange(false, cardType.title)}
                  >
                    <CloseCircleIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => handleDropdownChange(true, cardType.title)}
                  >
                    <OpenCircleIcon />
                  </button>
                )}
                <div>
                  <div className="text-sm text-blue-dark">{cardType.title}</div>
                  {activeDropdown[cardType.title] &&
                    cardType.subItems?.length > 0 && (
                      <div className="space-y-4 py-4">
                        {cardType.subItems.map(item => {
                          return (
                            <DecreeText
                              size={12}
                              className="pl-20 text-blue-dark uppercase underline cursor-pointer"
                              key={item.id}
                            >
                              {item.text}
                            </DecreeText>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
