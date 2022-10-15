import React, {useState} from 'react';
import Modal from 'react-modal';
import {
  ArrowLineLeftIcon,
  DeleteContactIcon,
  EditContactIcon,
} from '../../../assets/svg';
import {tabletWidth} from '../../../utils/constants/screen-width.constants';
import {DecreeText} from '../../core/DecreeText';
import {HandleWindowResize} from '../../core/HandleWindowResize';
import {Contact} from '../containers/ContactListContainer';
import {
  ModalActionButton,
  ModalActionButtonText,
  ModalActionWrapper,
} from './ContactListSection';

type ModalSelectedContactMobileProps = {
  isOpen?: boolean;
  selectedContact?: Contact | null;
  userClickedBack?: () => void;
  userClickedEdit: () => void;
  userClickedDelete: () => void;
};

export const ModalSelectedContactMobile = ({
  isOpen = false,
  ...props
}: ModalSelectedContactMobileProps) => {
  const [canOpen, setCanOpen] = useState(window.innerWidth < tabletWidth);

  return (
    <>
      <HandleWindowResize
        onResize={() => setCanOpen(window.innerWidth < tabletWidth)}
      />
      <Modal
        isOpen={isOpen && canOpen}
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
              {props?.selectedContact?.name}
            </DecreeText>
          </div>
          <div className="pt-4">
            <ModalActionWrapper>
              {/*<ModalActionButton className="bg-white">*/}
              {/*  <SendCardsIcon className="fill-current text-blue-dark group-hover:text-white" />*/}
              {/*  <ModalActionButtonText size={12}>*/}
              {/*    Send Cards*/}
              {/*  </ModalActionButtonText>*/}
              {/*</ModalActionButton>*/}
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedEdit}
              >
                <EditContactIcon className="fill-current text-blue-dark group-hover:text-white" />
                <ModalActionButtonText size={12}>Edit</ModalActionButtonText>
              </ModalActionButton>
              <ModalActionButton
                className="bg-white"
                onClick={props.userClickedDelete}
              >
                <DeleteContactIcon className="stroke-current text-blue-dark group-hover:text-white" />
                <ModalActionButtonText size={12}>Delete</ModalActionButtonText>
              </ModalActionButton>
            </ModalActionWrapper>
          </div>
          <div className="py-4 space-y-2">
            <div className="flex space-x-4">
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

            <div className="flex space-x-4">
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
            {/*<div className="flex space-x-4">*/}
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
        </div>
      </Modal>
    </>
  );
};
