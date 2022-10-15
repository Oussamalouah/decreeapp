import clsx from 'clsx';
import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {CloseIcon, CheckBox, ActiveCheckBox} from '../../../assets/svg';
import {AddressGroup} from '../../../services/customer-service';
import {DecreeText} from '../../core/DecreeText';

type Props = {
  userClickedClose: () => void;
  userClickedAddNewGroup?: () => void;
  groups: AddressGroup[];
  userClickedGroup?: (group: AddressGroup) => void;
  searchTerm?: string;
  forShipment?: boolean;
  userClickedGroupCheckbox?: (group: AddressGroup) => void;
  selectedContactsId?: string[];
  block?: boolean;
};

export const GroupSection = (props: Props) => {
  if (props?.forShipment) {
    return (
      <div
        className={clsx(
          'grid grid-cols-none  space-y-6 tablet:gap-4 tablet:space-y-0 my-8',
          {
            'grid-cols-1': props.block,
            'laptop:grid-cols-4': !props.block,
          }
        )}
      >
        {props.groups.map(group => {
          return (
            <div
              className="flex items-start justify-center space-x-2 cursor-pointer"
              key={group.id}
              onClick={() => props?.userClickedGroupCheckbox?.(group)}
            >
              {group.customerAddresses?.length > 0 &&
              group.customerAddresses.every(id =>
                props?.selectedContactsId?.includes(id)
              ) ? (
                <ActiveCheckBox />
              ) : (
                <CheckBox />
              )}
              <div className="flex justify-center">
                <OuterGroupBox shrinken>
                  <div className="font-serif text-white px-4 py-2 text-center truncate max-w-[150px]">
                    {group.name}
                  </div>
                  <InnerGroupBox>
                    <div className="text-center">
                      {group.customerAddresses.length} contacts
                    </div>
                  </InnerGroupBox>
                </OuterGroupBox>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="tablet:shadow-lg w-full tablet:p-8">
      <div className="flex justify-between items-center">
        <DecreeText size={18} className="font-serif text-blue-dark font-bold">
          {props.groups.length} Groups
        </DecreeText>
        <button
          className="hidden tablet:block"
          onClick={props.userClickedClose}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="grid grid-cols-none laptop:grid-cols-4 space-y-6 tablet:gap-4 tablet:space-y-0 my-8">
        {props.groups.map(group => {
          if (props.searchTerm) {
            const isInGroup = group.customerAddressesWithNames?.find(customer =>
              `${customer.firstName} ${customer?.middleName || ''} ${
                customer.lastName
              }`
                .replaceAll(' ', '')
                .toLowerCase()
                .includes(
                  props?.searchTerm?.replaceAll(' ', '').toLowerCase() || ''
                )
            );

            if (!isInGroup) {
              return null;
            }
          }

          return (
            <div className="flex justify-center" key={group.id}>
              <OuterGroupBox onClick={() => props?.userClickedGroup?.(group)}>
                <div className="font-serif text-white px-4 py-2 text-center">
                  {group.name}
                </div>
                <InnerGroupBox>
                  <div className="text-center">
                    {group.customerAddresses.length} contacts
                  </div>
                </InnerGroupBox>
              </OuterGroupBox>
            </div>
          );
        })}

        <div className="flex justify-center">
          <div
            onClick={props?.userClickedAddNewGroup}
            className="border-dashed border-[1px] min-h-[100px] w-[175px] rounded-md border-blue-dark flex justify-center items-center cursor-pointer"
          >
            + add new group
          </div>
        </div>
      </div>
    </div>
  );
};

const OuterGroupBox = tw.div<{shrinken?: boolean}>`
  bg-blue-dark rounded-lg cursor-pointer ${p =>
    p.shrinken ? 'min-w-[150px]' : 'min-w-[175px]'}
`;
const InnerGroupBox = tw.div` 
  bottom-0 bg-white rounded-md px-4 py-7 w-full left-0 shadow-lg
`;
