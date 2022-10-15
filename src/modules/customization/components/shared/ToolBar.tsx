import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import {
  ToolbarBox,
  ToolbarBoxActive,
  ToolbarCircle,
  ToolbarCircleActive,
  ToolbarLine,
  ToolbarLineActive,
  ToolbarPaper,
  ToolbarPaperActive,
  ToolbarPencil,
  ToolbarPencilActive,
  ToolbarSelect,
  ToolbarSelectActive,
  ToolbarSymbols,
  ToolbarSymbolsActive,
  ToolbarText,
  ToolbarTextActive,
} from '../../../../assets/svg';
import {EditModes, PaperOrientation} from '../../models/CustomCardElements';
import clsx from 'clsx';

type Props = {
  orientation: PaperOrientation;
  editMode: EditModes | undefined | null;
  isDisabled?: boolean;
  loading?: boolean;
  onClick?: (editMode: EditModes) => void;
};

const toolbarItems = [
  {
    name: EditModes.SELECT,
    icon: ToolbarSelect,
    active_icon: ToolbarSelectActive,
  },
  {
    name: EditModes.PAPER,
    icon: ToolbarPaper,
    active_icon: ToolbarPaperActive,
  },
  {
    name: EditModes.PENCIL,
    icon: ToolbarPencil,
    active_icon: ToolbarPencilActive,
  },
  {
    name: EditModes.TEXT,
    icon: ToolbarText,
    active_icon: ToolbarTextActive,
  },
  {
    name: EditModes.LINE,
    icon: ToolbarLine,
    active_icon: ToolbarLineActive,
  },
  {
    name: EditModes.BOX,
    icon: ToolbarBox,
    active_icon: ToolbarBoxActive,
  },
  {
    name: EditModes.CIRCLE,
    icon: ToolbarCircle,
    active_icon: ToolbarCircleActive,
  },
  {
    name: EditModes.SYMBOLS,
    icon: ToolbarSymbols,
    active_icon: ToolbarSymbolsActive,
  },
];

export const Toolbar = (props: Props) => {
  return (
    <div
      className={clsx([
        'absolute flex',
        {'flex-col left-0': props.orientation === PaperOrientation.PORTRAIT},
        {'flex-row top-0': props.orientation === PaperOrientation.LANDSCAPE},
        {hidden: props.loading},
      ])}
    >
      {toolbarItems.map(item => {
        const Icon =
          item.name === props.editMode ? item.active_icon : item.icon;

        return (
          <ToolbarWrapper
            key={item.name}
            $isActive={item.name === props.editMode}
            $isDisabled={props.isDisabled}
            onClick={() => {
              if (props.isDisabled) return;
              props.onClick?.(item.name);
            }}
          >
            <Icon />
          </ToolbarWrapper>
        );
      })}
    </div>
  );
};

const ToolbarWrapper = tw.div<{$isActive?: boolean; $isDisabled?: boolean}>`
  flex items-center justify-center 
  border border-blue-dark 
  w-[37px] h-[37px]
  ${p => (p.$isDisabled ? 'cursor-not-allowed' : 'cursor-pointer')}
  ${p => (p.$isActive ? 'bg-blue-dark' : 'bg-offwhite')}
`;
