import React, {useState, useRef, MutableRefObject} from 'react';
import {
  useCustomerData,
  useEmail,
} from '../../../../utils/hooks/customer-hooks';
import {ProfilePageWrapper} from './ProfilePageWrapper';
import {DecreeButton} from '../../../core/DecreeButton';
import {DecreeText} from '../../../core/DecreeText';
import {isMobileOnly} from 'react-device-detect';
import clsx from 'clsx';
import {routes} from '../../../../route-list';
import {customerService} from '../../../../services/customer-service';
import {toast} from 'react-toastify';

import {
  SmallArrowDownIcon,
  SearchIcon,
  AddUserIcon,
  GroupUserIcon,
} from '../../../../assets/svg';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {tabletWidth} from '../../../../utils/constants/screen-width.constants';
import {HandleWindowResize} from '../../../core/HandleWindowResize';

type Props = {
  children: React.ReactNode;
  userTypedOnSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddressBookWrap = (props: Props) => {
  const customerData = useCustomerData();
  const [isTabletWidth, setIsTabletWidth] = useState(
    window.innerWidth >= tabletWidth
  );
  const contactListImportFile = useRef() as MutableRefObject<HTMLInputElement>;
  const match = useRouteMatch();
  const history = useHistory();
  const email = useEmail();

  return (
    <ProfilePageWrapper
      title={
        customerData?.customer?.firstName +
          ' ' +
          customerData?.customer?.lastName ||
        customerData?.customer?.firstName ||
        ''
      }
      titleComponentOnMobileOverride={
        <DecreeText size={24} className="font-serif">
          Setting
        </DecreeText>
      }
      userClickedBack={() => history.goBack()}
      userClickedClose={() => history.push(routes.HOME)}
      showBackOnMobileHeader={true}
      hideHeaderTabs={true}
    >
      <HandleWindowResize
        onResize={() => setIsTabletWidth(window.innerWidth >= tabletWidth)}
      />
      {/* Using hidden still takes up space */}
      {isTabletWidth && (
        <button
          className="flex items-center self-start space-x-4 outline focus:outline-none"
          onClick={() => history.push(routes.USER__SETTING)}
        >
          <SmallArrowDownIcon width={14} stroke="#324B6F" />
          <DecreeText size={23} className="font-serif font-bold text-blue-cyan">
            Setting
          </DecreeText>
        </button>
      )}
      <div className="text-base tablet:text-3xl font-serif font-bold text-black-light">
        My Address Book
      </div>
      <div className="relative w-full block tablet:hidden">
        <input
          className="w-full border border-blue-dark rounded-md px-2 py-1"
          placeholder="Search Contacts"
          onChange={props?.userTypedOnSearch}
        />
        <DecreeButton className="flex items-center justify-center absolute right-0 top-0 h-full rounded-bl-none rounded-tl-none w-[40px]">
          <SearchIcon />
        </DecreeButton>
      </div>
      <div className="w-full flex self-start space-x-2 -ml-2 tablet:space-x-4">
        {/* TODO: Match the UI for this with figma */}
        <div className="w-full relative hidden tablet:block">
          <input
            className="w-full h-full border border-blue-dark rounded-md px-2 "
            placeholder="Search Contacts"
            onChange={props?.userTypedOnSearch}
          />
          <DecreeButton className="absolute right-0 top-0 h-full rounded-bl-none rounded-tl-none w-[40px]">
            <SearchIcon />
          </DecreeButton>
        </div>
        <div className="group flex tablet:min-w-[144px] relative">
          <DecreeButton
            mode="secondary"
            className="flex items-center space-x-2 bg-white group-hover:bg-blue-dark"
          >
            <AddUserIcon className="fill-current text-blue-dark group-hover:text-white" />
            <DecreeText
              size={12}
              className="flex group-hover:text-white whitespace-nowrap"
            >
              {isMobileOnly ? 'Add' : 'Add a new contact'}
            </DecreeText>
          </DecreeButton>

          <div className="w-full absolute top-full z-10 hidden group-hover:block bg-white">
            <div className="flex flex-col items-center space-y-5 border-md py-3 shadow-md">
              <input
                className="hidden"
                id="contactListImportFile"
                ref={contactListImportFile}
                onChange={async event => {
                  if (event.target.files && event.target.files[0]) {
                    try {
                      await customerService.createCustomerAddressBookEntriesFromFile(
                        email as string,
                        event.target.files[0]
                      );
                      toast.success('Your contacts have been imported.');
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    } catch (e) {
                      toast.error(
                        e?.message || 'Something went wrong. Please try again.'
                      );
                    }
                  }
                }}
                type="file"
              />
              <DecreeText
                size={12}
                onClick={() =>
                  history.push(routes.USER__SETTING__ADDRESS_BOOK__ADD)
                }
                className="text-blue-dark cursor-pointer"
              >
                Add manually
              </DecreeText>

              <DecreeText
                onClick={() =>
                  contactListImportFile.current &&
                  contactListImportFile.current.click()
                }
                size={12}
                className="text-blue-dark cursor-pointer"
              >
                Import
              </DecreeText>
            </div>
          </div>
        </div>
        <DecreeButton
          onClick={() => history.push(routes.USER__SETTINGS__ADDRESS_GROUP)}
          mode={
            match.path === routes.USER__SETTINGS__ADDRESS_GROUP
              ? 'primary'
              : 'secondary'
          }
          className={clsx([
            'group flex tablet:min-w-[144px]  items-center space-x-2 hover:bg-blue-dark',
            {
              'bg-white': match.path !== routes.USER__SETTINGS__ADDRESS_GROUP,
            },
          ])}
        >
          <GroupUserIcon
            className={clsx('fill-current group-hover:text-white', {
              'text-blue-dark':
                match.path !== routes.USER__SETTINGS__ADDRESS_GROUP,
            })}
          />
          <DecreeText
            size={12}
            className={clsx('flex group-hover:text-white whitespace-nowrap', {
              'text-white': match.path === routes.USER__SETTINGS__ADDRESS_GROUP,
            })}
          >
            {isMobileOnly ? 'Group' : 'My Groups'}
          </DecreeText>
        </DecreeButton>
      </div>
      <div className="w-full flex self-start">
        <a href="/csvs/custom-addresses-template.csv">
          <DecreeText size={10} className="text-blue-dark cursor-pointer">
            Download template for importing contacts
          </DecreeText>
        </a>
      </div>

      {/*uncomment the lines below to implement "share my link feature"*/}
      {/*<DecreeButton*/}
      {/*  mode="secondary"*/}
      {/*  className="group flex tablet:min-w-[144px] items-center space-x-2 bg-white hover:bg-blue-dark"*/}
      {/*>*/}
      {/*  <ShareIcon className="fill-current text-blue-dark group-hover:text-white" />*/}
      {/*  <DecreeText*/}
      {/*    size={12}*/}
      {/*    className="flex group-hover:text-white whitespace-nowrap"*/}
      {/*  >*/}
      {/*    {isMobileOnly ? 'Share' : 'Share my link'}*/}
      {/*  </DecreeText>*/}
      {/*</DecreeButton>*/}
      {/*end :: share link feature*/}
      {props.children}
    </ProfilePageWrapper>
  );
};
