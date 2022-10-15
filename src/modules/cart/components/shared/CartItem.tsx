import React, {useEffect, useState} from 'react';
import {DecreeText} from '../../../core/DecreeText';
import {DecreeDropdown} from '../../../core/DecreeDropdown';
import clsx from 'clsx';
import {ReactSVG} from 'react-svg';
import styled from 'styled-components';
import {SettingOption} from '../../../customization/models/SettingOption';
import {
  AddressGroup,
  CreateCustomerAddressBookEntryResponse,
} from '../../../../services/customer-service';
import {GroupSection} from '../../../user/components/GroupSection';
import {DecreeButton} from '../../../core/DecreeButton';
import {
  ActiveCheckBox,
  AddUserIcon,
  CheckBox,
  SearchIcon,
} from '../../../../assets/svg';
import {getAddressesFromCsv} from '../../../../utils/convert-addresses-from-csv-to-json';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../../route-list';

type Props = {
  title: string;
  subtitle: string;
  costText: string;
  quantity: number;
  quantityPresets: {name: string; value: string}[];
  mode?: 'modal' | 'screen';
  imageSrc: string;
  shipmentValue?: string;
  isShippingHidden?: boolean;
  isEmailTextVisible?: boolean;
  isEditDisabled?: boolean;
  isEditHidden?: boolean;
  isQuantityDisabled?: boolean;
  isTitleAndImageDisabled: boolean;
  onRemove: () => void;
  onQuantitySelect: (quantity: number) => void;
  onEdit: () => void;
  shipmentOptions?: SettingOption[];
  onSelectShipment?: (id: string) => void;
  onImageOrTitleClicked: () => void;
  addressGroups: AddressGroup[];
  userContacts: CreateCustomerAddressBookEntryResponse[];
  userConfiguredShipment: (variantId: string, contactIds: string[]) => void;
  persistedCsvLink: string | null;
};

// Watch out for multiple declaration of the following: (for responsiveness)
// - Edit button
// - Remove button

export const CartItem = (props: Props) => {
  const {mode = 'screen'} = props;
  const [shipmentValue, setShipmentValue] = useState<string>(
    props.shipmentValue || ''
  );
  const [showAddressGroups, setShowAddressGroups] = useState<boolean>(false);
  const [searchContactsTerm, setSearchContactsTerm] = useState<string>('');
  const [contactSearchResults, setContactSearchResults] = useState<
    CreateCustomerAddressBookEntryResponse[]
  >([]);
  const [selectedContactsId, setSelectedContactsId] = useState<string[]>([]);

  const history = useHistory();

  const handleGetPersistedContacts = React.useCallback(async () => {
    if (props.persistedCsvLink) {
      const data = await getAddressesFromCsv(props.persistedCsvLink);
      setSelectedContactsId(() => data.map(contact => contact.id));
    }
  }, [props.persistedCsvLink]);

  useEffect(() => {
    setShowAddressGroups(Boolean(shipmentValue));
  }, [shipmentValue]);

  useEffect(() => {
    if (props.userContacts?.length && searchContactsTerm) {
      const result = props.userContacts.filter(contact =>
        `${contact.firstName}${contact?.middleName || ''}${contact.lastName}`
          .toLowerCase()
          .includes(searchContactsTerm.replaceAll(' ', '').toLowerCase())
      );
      setContactSearchResults(result);
    } else {
      setContactSearchResults([]);
    }
  }, [props.userContacts, searchContactsTerm]);

  useEffect(() => {
    handleGetPersistedContacts();
  }, [handleGetPersistedContacts]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex">
          <div
            className={clsx([
              'flex items-center justify-center w-[143px] h-[143px] laptop:w-[152px] laptop:h-[152px] px-8 py-4 bg-offwhite',
              {
                'cursor-not-allowed': props.isTitleAndImageDisabled,
                'cursor-pointer': !props.isTitleAndImageDisabled,
              },
            ])}
            onClick={props.onImageOrTitleClicked}
          >
            <ReactSVGStyled
              src={props.imageSrc}
              className="filter drop-shadow-card"
              fallback={() => (
                <img
                  src={props.imageSrc}
                  className="object-contain w-[83px] h-[116px] laptop:w-[88px] laptop:h-[124px]"
                />
              )}
            />
          </div>
          <div className="flex flex-col flex-1 ml-3 space-y-4 laptop:ml-9">
            <div
              className={clsx([
                'text-left',
                {
                  'cursor-not-allowed': props.isTitleAndImageDisabled,
                  'cursor-pointer': !props.isTitleAndImageDisabled,
                },
              ])}
              onClick={props.onImageOrTitleClicked}
            >
              <DecreeText
                size={23}
                className="font-serif font-bold text-blue-dark"
              >
                {props.title}
              </DecreeText>
              <DecreeText
                size={14}
                className="font-serif font-bold tracking-[0.075em] uppercase text-gold"
              >
                {props.subtitle}
              </DecreeText>
            </div>
            <div className="grid grid-cols-3">
              <div
                className={clsx([
                  'flex flex-col space-y-6 justify-between flex-1',
                  {'col-span-3 laptop:col-span-2': props.mode !== 'modal'},
                  {'col-span-3': props.mode === 'modal'},
                ])}
              >
                <div className="grid grid-cols-4">
                  <div
                    className={clsx([
                      {
                        'col-span-4 laptop:col-span-3 max-w-[205px]':
                          props.mode !== 'modal',
                      },
                      {'col-span-4': props.mode === 'modal'},
                    ])}
                  >
                    <DecreeDropdown
                      items={props.quantityPresets}
                      value={props.quantity.toString()}
                      disabled={props.isQuantityDisabled}
                      onChange={e =>
                        props.onQuantitySelect(parseInt(e.currentTarget.value))
                      }
                    />
                  </div>
                  {/* Generally visible on desktops, unless the mode is "modal"  */}
                  <div
                    className={`self-center flex-1 hidden laptop:block ${
                      mode === 'modal' ? 'laptop:hidden' : ''
                    }`}
                  >
                    <DecreeText
                      size={21}
                      className="tracking-widest text-blue-dark"
                    >
                      {props.costText}
                    </DecreeText>
                  </div>
                </div>
                <DecreeText
                  size={12}
                  className={clsx([
                    'text-[#FF0000] text-left',
                    {hidden: mode === 'modal' || !props.isEmailTextVisible},
                    {
                      'hidden laptop:block':
                        mode !== 'modal' && props.isEmailTextVisible,
                    },
                  ])}
                >
                  A proof will be emailed to you for approval before printing.
                </DecreeText>
                <div>
                  {mode === 'modal' ? (
                    <div className="flex items-center justify-between">
                      {!props.isEditHidden ? (
                        <button
                          className={clsx({
                            'cursor-not-allowed': props.isEditDisabled,
                          })}
                          onClick={props.onEdit}
                          disabled={props.isEditDisabled}
                        >
                          <DecreeText
                            size={12}
                            className={clsx({
                              'text-blue-dark': !props.isEditDisabled,
                              'text-gray-medium': props.isEditDisabled,
                            })}
                          >
                            Edit
                          </DecreeText>
                        </button>
                      ) : (
                        // To make sure "Remove" would show up at the rightmost
                        <div />
                      )}
                      <button onClick={props.onRemove}>
                        <DecreeText size={12} className="text-blue-dark">
                          Remove
                        </DecreeText>
                      </button>
                    </div>
                  ) : (
                    // Only visible on desktop
                    <ReviewedCheckbox className="hidden laptop:flex max-w-[205px]" />
                  )}
                </div>
              </div>
              {/* Generally visible on desktops, unless the mode is "modal"  */}
              <div
                className={`self-end flex-1 hidden laptop:block space-x-6 ${
                  mode === 'modal' ? 'laptop:hidden' : ''
                }`}
              >
                {!props.isEditHidden ? (
                  <button
                    className={clsx({
                      'cursor-not-allowed': props.isEditDisabled,
                    })}
                    onClick={props.onEdit}
                    disabled={props.isEditDisabled}
                  >
                    <DecreeText
                      size={12}
                      className={clsx({
                        'text-blue-dark underline': !props.isEditDisabled,
                        'text-gray-medium': props.isEditDisabled,
                      })}
                    >
                      Edit
                    </DecreeText>
                  </button>
                ) : (
                  // To make sure "Remove" would show up at the rightmost
                  <div />
                )}
                <button onClick={props.onRemove}>
                  <DecreeText size={12} className="underline text-blue-dark">
                    Remove
                  </DecreeText>
                </button>
              </div>
            </div>
          </div>
        </div>
        <DecreeText
          size={12}
          className={clsx([
            'text-[#FF0000]',
            {hidden: mode === 'screen' || !props.isEmailTextVisible},
          ])}
        >
          A proof will be emailed to you for approval before printing.
        </DecreeText>
      </div>
      {/* Only visible on mobile  */}
      <DecreeText
        size={10}
        className={clsx([
          'text-[#FF0000] text-left',
          {
            hidden: !props.isEmailTextVisible,
            'laptop:hidden': props.isEmailTextVisible,
          },
        ])}
      >
        A proof will be emailed to you for approval before printing.
      </DecreeText>
      <ReviewedCheckbox className="mt-4 laptop:hidden" />
      {props.shipmentOptions && !props.isShippingHidden && (
        <div className="flex items-center space-x-4 mt-4">
          <DecreeText size={16} className="text-blue-dark">
            Envelopes
          </DecreeText>
          <DecreeDropdown
            className="laptop:min-w-[312px]"
            items={[
              {name: 'I will address them myself', value: ''},
              ...props.shipmentOptions,
            ]}
            value={shipmentValue}
            onChange={e => {
              setShipmentValue(e.target.value);
              if (!e.target.value) {
                props.userConfiguredShipment(
                  e.target.value,
                  selectedContactsId
                );
              }
            }}
          />
        </div>
      )}
      {/* Only visible on mobile  */}
      <div className="flex items-center justify-between mt-2 laptop:hidden">
        <div className="space-x-6">
          {!props.isEditHidden && (
            <button
              className={clsx({
                'cursor-not-allowed': props.isEditDisabled,
              })}
              onClick={props.onEdit}
              disabled={props.isEditDisabled}
            >
              <DecreeText
                size={12}
                className={clsx({
                  'text-blue-dark underline': !props.isEditDisabled,
                  'text-gray-medium': props.isEditDisabled,
                })}
              >
                Edit
              </DecreeText>
            </button>
          )}
          <button onClick={props.onRemove}>
            <DecreeText size={12} className="underline text-blue-dark">
              Remove
            </DecreeText>
          </button>
        </div>
        <DecreeText size={21} className="tracking-widest text-blue-dark">
          {props.costText}
        </DecreeText>
      </div>
      {showAddressGroups && (
        <div className="shadow-lg w-full p-8">
          {(props.userContacts.length > 0 && (
            <>
              <DecreeText
                size={23}
                className="text-left mb-4 text-blue-dark font-serif"
              >
                Please select which contacts or groups will receive this
                stationary.
              </DecreeText>
              <div className="relative w-full">
                <input
                  className="w-full border border-blue-dark rounded-md px-2 py-1"
                  placeholder="Search Contacts"
                  value={searchContactsTerm}
                  onChange={e => setSearchContactsTerm(e.target.value)}
                />
                <DecreeButton className="flex items-center justify-center absolute right-0 top-0 h-full rounded-bl-none rounded-tl-none w-[40px]">
                  <SearchIcon />
                </DecreeButton>
              </div>
              {contactSearchResults.length > 0 && (
                <div className="relative w-full">
                  <div className="mr-[40px] p-4 space-y-4 border-[1px] border-gray rounded-md max-h-[225px] overflow-y-auto">
                    {contactSearchResults.map(contact => {
                      const isSelected = selectedContactsId.includes(
                        contact.id
                      );

                      return (
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          key={contact.id}
                          onClick={() =>
                            setSelectedContactsId(prev =>
                              isSelected
                                ? prev.filter(id => id !== contact.id)
                                : [...prev, contact.id]
                            )
                          }
                        >
                          {isSelected ? <ActiveCheckBox /> : <CheckBox />}
                          <div>
                            {contact.firstName} {contact?.lastName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <GroupSection
                forShipment
                block={props.mode === 'modal'}
                groups={props.addressGroups || []}
                userClickedClose={() => setShipmentValue('')}
                userClickedGroupCheckbox={group =>
                  setSelectedContactsId(prev => {
                    if (
                      group.customerAddresses.every(id => prev.includes(id))
                    ) {
                      return prev.filter(
                        id => !group.customerAddresses.includes(id)
                      );
                    } else {
                      return [...prev, ...group.customerAddresses];
                    }
                  })
                }
                selectedContactsId={selectedContactsId}
              />
              <div className="flex items-center justify-between">
                <DecreeButton
                  mode="secondary"
                  className="bg-white"
                  onClick={() => {
                    setSearchContactsTerm('');
                    setSelectedContactsId([]);
                    setShipmentValue('');
                    setShowAddressGroups(false);
                    props.userConfiguredShipment('', []);
                  }}
                >
                  Clear
                </DecreeButton>
                <DecreeButton
                  mode="primary"
                  onClick={() =>
                    props.userConfiguredShipment(
                      shipmentValue,
                      selectedContactsId
                    )
                  }
                >
                  Save Changes
                </DecreeButton>
              </div>
            </>
          )) || (
            <>
              <DecreeText
                size={23}
                className="text-left mb-4 text-blue-dark font-serif"
              >
                You don't have any groups or contacts in your address book.
              </DecreeText>
              <DecreeButton
                mode="secondary"
                className="bg-white flex items-center space-x-2"
                onClick={() =>
                  history.push(routes.USER__SETTING__ADDRESS_BOOK__ADD)
                }
              >
                <AddUserIcon />
                <DecreeText size={12}>Add a new contact</DecreeText>
              </DecreeButton>
            </>
          )}
        </div>
      )}
    </>
  );
};

const ReviewedCheckbox = (
  props: {text?: string} & React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div
      className={`flex items-center space-x-3 laptop:space-x-4 ${props.className}`}
    >
      <input type="checkbox" />
      <DecreeText size={10} className="text-left">
        {props.text ||
          'I have reviewed this item’s spelling, dates, and grammar, and I approve it for printing'}
      </DecreeText>
    </div>
  );
};

const ReactSVGStyled = styled(ReactSVG)`
  div > svg {
    width: 100%;
    height: 100%;
  }
`;
