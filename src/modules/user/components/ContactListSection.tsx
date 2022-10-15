import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {isMobileOnly} from 'react-device-detect';
import tw from 'tailwind-styled-components/dist/tailwind';
import {
  ActiveCheckBox,
  CheckBox,
  CloseCircleIcon,
  DeleteContactIcon,
  EditContactIcon,
  OpenCircleIcon,
} from '../../../assets/svg';
import {
  greetingCategories,
  weddingCategories,
  weddingProductTypes,
} from '../../../utils/constants/store.contants';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeText} from '../../core/DecreeText';
import {ContactListSectionProps} from '../containers/ContactListContainer';
import {ModalGroupSelectedContacts} from './ModalGroupSelectedContacts';
import {ModalSelectedContactMobile} from './ModalSelectedContactMobile';
import {DecreeSpinner} from '../../core/DecreeSpinner';

const alphabet = [
  '#',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const groupCategories = [
  {
    title: 'WEDDING INVITATIONS',
    subCategories: weddingCategories.filter(
      category => category.id !== weddingProductTypes.PACKAGE
    ),
  },
  {
    title: 'GREETING STATIONERY',
    subCategories: greetingCategories,
  },
  {
    title: 'BUSINESS STATIONERY',
    subCategories: [],
  },
  {
    title: 'BESPOKE STATIONERY',
    subCategories: [],
  },
  {
    title: 'PACKAGES',
    subCategories: [],
  },
];

export const ContactListSection = (props: ContactListSectionProps) => {
  return (
    <>
      {/* User clicks on add contact */}

      {/* User clicks on "My Groups" button */}
      {/* <GroupSection /> */}
      {/* <ConfigureGroup {...props} /> */}
      <div className="w-full min-h-full space-y-4">
        <div className="flex self-start space-x-6 relative">
          <DecreeText size={21} className="text-black-light">
            {props.totalAmountOfContacts} contacts
          </DecreeText>
          {/*select contacts button*/}
          {/*<div*/}
          {/*  className="flex items-center space-x-2 cursor-pointer absolute right-0"*/}
          {/*  onClick={props.userClickedSelect}*/}
          {/*>*/}
          {/*  <SelectIcon />*/}
          {/*  <DecreeText*/}
          {/*    size={12}*/}
          {/*    className={clsx('text-blue-dark', {*/}
          {/*      'font-bold': props.isSelectActive,*/}
          {/*    })}*/}
          {/*  >*/}
          {/*    SELECT*/}
          {/*  </DecreeText>*/}
          {/*</div>*/}
        </div>
        <div
          className={clsx(
            'absolute  right-7 -py-2 tablet:py-0 tablet:static tablet:flex self-start',
            {'z-10': !props.selectedContact && !props.isGroupContactModalOpen},
            {'hidden tablet:block': props.loading}
          )}
        >
          {alphabet.map(letter => (
            <DecreeText
              size={isMobileOnly ? 12 : 18}
              className={clsx([
                'flex-1 uppercase',
                {'text-blue-dark': letter === props.activeLetter},
                {'text-gray-silver': letter !== props.activeLetter},
                {'cursor-not-allowed': props.loading},
                {'cursor-pointer': !props.loading},
              ])}
              onClick={() => {
                if (!props.loading) {
                  props.userClickedLetter(letter);
                }
              }}
            >
              {letter}
            </DecreeText>
          ))}
        </div>
        <div className="hidden tablet:block h-[1px] w-full bg-gray" />
      </div>
      <div className={clsx([{hidden: !props.loading}])}>
        <DecreeSpinner type="primary" />
      </div>
      <div
        className={clsx([
          'grid grid-cols-3 w-full relative self-start space-y-6',
          {hidden: props.loading},
        ])}
      >
        <div className="space-y-6 min-h-[450px] tablet:min-h-0">
          <DecreeText size={18}>
            {props.isSelectActive
              ? `${props.groupSelectedContacts.length} selected`
              : `${props.contacts.length} contacts`}
          </DecreeText>
          {props.contacts.map(contact => {
            const isActiveContact =
              props.selectedContact?.name === contact.name ||
              props.groupSelectedContacts.some(
                groupContact => groupContact.name === contact.name
              );

            return (
              <div
                className="max-w-max flex space-x-5 cursor-pointer"
                onClick={() => {
                  if (!props.isSelectActive) {
                    props.userClickedContact(contact);
                  } else {
                    props.userClickedGroupedContact(contact);
                  }
                }}
              >
                {props.isSelectActive &&
                  (isActiveContact ? <ActiveCheckBox /> : <CheckBox />)}
                <DecreeText
                  size={18}
                  className={clsx([
                    'text-blue-dark',
                    {'font-bold': isActiveContact && !props.isSelectActive},
                  ])}
                >
                  {contact.name}
                </DecreeText>
              </div>
            );
          })}
        </div>
        <div
          className={clsx([
            'col-span-2',
            {
              'hidden tablet:block': !(
                !props.selectedContact && props.groupSelectedContacts.length < 1
              ),
            },
            {
              hidden:
                !props.selectedContact &&
                props.groupSelectedContacts.length < 1,
            },
          ])}
        >
          <div className="bg-offwhite px-7 py-7 space-y-8">
            <div className="space-y-6">
              <DecreeText
                size={23}
                className="font-serif font-bold text-center whitespace-nowrap"
              >
                {props.isSelectActive
                  ? `${props.groupSelectedContacts.length} Contacts`
                  : props.selectedContact?.name}
              </DecreeText>
              <div
                className={clsx([
                  'flex space-x-4',
                  {hidden: props.isSelectActive},
                ])}
              >
                <DecreeText
                  size={14}
                  className="text-blue-dark whitespace-nowrap"
                >
                  BIRTHDAY:
                </DecreeText>
                <DecreeText
                  size={14}
                  className="text-black-light whitespace-nowrap"
                >
                  {props.selectedContact?.birthday}
                </DecreeText>
              </div>
              <div
                className={clsx([
                  'flex space-x-4',
                  {hidden: props.isSelectActive},
                ])}
              >
                <DecreeText
                  size={14}
                  className="text-blue-dark whitespace-nowrap"
                >
                  ANNIVERSARY:
                </DecreeText>
                <DecreeText
                  size={14}
                  className="text-black-light whitespace-nowrap"
                >
                  {props.selectedContact?.anniversary}
                </DecreeText>
              </div>
              {/*<div*/}
              {/*  className={clsx([*/}
              {/*    'flex space-x-4',*/}
              {/*    {hidden: props.isSelectActive},*/}
              {/*  ])}*/}
              {/*>*/}
              {/*  <DecreeText*/}
              {/*    size={14}*/}
              {/*    className="text-blue-dark whitespace-nowrap"*/}
              {/*  >*/}
              {/*    GROUP:*/}
              {/*  </DecreeText>*/}
              {/*  <DecreeText*/}
              {/*    size={14}*/}
              {/*    className="text-black-light underline whitespace-nowrap"*/}
              {/*  >*/}
              {/*    {_.startCase('my family')}*/}
              {/*  </DecreeText>*/}
              {/*</div>*/}
            </div>
            <div className="grid grid-cols-3">
              {/*<ModalActionWrapper>*/}
              {/*  <ModalActionButton>*/}
              {/*    <SendCardsIcon className="fill-current text-blue-dark group-hover:text-white" />*/}
              {/*    <ModalActionButtonText size={12}>*/}
              {/*      Send Cards*/}
              {/*    </ModalActionButtonText>*/}
              {/*  </ModalActionButton>*/}
              {/*</ModalActionWrapper>*/}
              <ModalActionWrapper>
                <ModalActionButton onClick={props.userClickedEditContact}>
                  <EditContactIcon className="fill-current text-blue-dark group-hover:text-white" />
                  <ModalActionButtonText size={12}>
                    Edit Contact
                  </ModalActionButtonText>
                </ModalActionButton>
              </ModalActionWrapper>
              <ModalActionWrapper>
                <ModalActionButton onClick={props.userClickedDeleteContact}>
                  <DeleteContactIcon className="stroke-current text-blue-dark group-hover:text-white" />
                  <ModalActionButtonText size={12}>
                    Delete Contact
                  </ModalActionButtonText>
                </ModalActionButton>
              </ModalActionWrapper>
            </div>
            <div
              className={clsx([
                'py-6 space-y-6',
                {hidden: !props.isSelectActive},
              ])}
            >
              {/* TODO: make a container for this */}
              {groupCategories.map(category => {
                const [isSubCategoryVisible, setIsSubCategoryVisible] =
                  useState(false);

                useEffect(() => {
                  setIsSubCategoryVisible(false);
                }, [props.activeLetter, props.isSelectActive]);

                return (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      {isSubCategoryVisible ? (
                        <CloseCircleIcon
                          className={clsx([
                            {
                              'fill-current stroke-current text-offwhite':
                                category.subCategories.length < 1,
                            },
                          ])}
                        />
                      ) : (
                        <OpenCircleIcon
                          className={clsx([
                            {
                              'stroke-current text-offwhite':
                                category.subCategories.length < 1,
                            },
                          ])}
                        />
                      )}
                      <DecreeText
                        size={12}
                        className="text-blue-dark cursor-pointer"
                        onClick={() =>
                          setIsSubCategoryVisible(!isSubCategoryVisible)
                        }
                      >
                        {category.title}
                      </DecreeText>
                    </div>
                    {category.subCategories.length > 0 && (
                      <div
                        className={clsx([
                          'space-y-4',
                          {hidden: !isSubCategoryVisible},
                        ])}
                      >
                        {category.subCategories!.map(subcategory => (
                          <DecreeText
                            size={12}
                            className="pl-20 text-blue-dark uppercase underline cursor-pointer"
                          >
                            {subcategory!.text}
                          </DecreeText>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ModalSelectedContactMobile
        isOpen={!!props.selectedContact}
        selectedContact={props.selectedContact}
        userClickedBack={props.userClickedBack}
        userClickedDelete={props.userClickedDeleteContact}
        userClickedEdit={props.userClickedEditContact}
      />
      <ModalGroupSelectedContacts
        isOpen={props.isGroupContactModalOpen}
        groupSelectedContacts={props.groupSelectedContacts}
        userClickedBack={props.userClickedBackFromGroupContactMobile}
      />
      {props.groupSelectedContacts.length > 0 && (
        <div className="tablet:hidden flex self-start border-t border-gray pt-4">
          <div className="flex space-x-4 items-center">
            <DecreeButton onClick={props.userClickedGroupedContactNext}>
              Next
            </DecreeButton>
            <DecreeText size={16}>
              {props.groupSelectedContacts.length} selected
            </DecreeText>
            <button onClick={props.userClickedClear}>
              <DecreeText size={16} className="underline text-gray-medium">
                Clear
              </DecreeText>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const ModalActionWrapper = tw.div`
  flex space-x-8 tablet:space-x-0 tablet:items-center tablet:justify-center
`;

export const ModalActionButton = tw(DecreeButton)`
  group flex items-center space-x-3 tablet:min-w-[114px]
  bg-offwhite hover:bg-blue-dark border border-blue-dark
`;

export const ModalActionButtonText = tw(DecreeText)`
  text-blue-dark group-hover:text-white whitespace-nowrap
`;
