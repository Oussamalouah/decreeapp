import React from 'react';
import {DecreeFooter} from './DecreeFooter';
import {DecreeHeader} from './DecreeHeader';

/**
 * @typedef DecreePageWrapperProps
 */
type DecreePageWrapperProps = {
  isHeaderVisible?: boolean;
  isFooterVisible?: boolean;
  sampleIsOnLimit?: boolean;
  headerType?: 'absolute' | 'block';
  color?: 'blue' | 'white';
};

/**
 * A page wrapper component to avoid calling DecreeHeader and DecreeFooter every time
 * Able to choose if you want to show the header and footer
 * Lets you customize which footer type to use 'big' or 'small'
 * Lets you customize which header type to use 'absolute' or 'block'
 *
 * @component
 * @example
 * // Only footer visible
 * <DecreeRoundButton isHeaderVisible={false}><ExamplePage/></DecreeRoundButton>
 * // Only header is visible and is using the block type
 * <DecreeRoundButton headerType={'block'} isFooterVisible={false}><ExamplePage/></DecreeRoundButton>
 * // Both header and footer visible and its using the small footer type and the absolute header type
 * <DecreeRoundButton headerType={'absolute'} mode={'small'}><ExamplePage/></DecreeRoundButton>
 *
 * @param {DecreePageWrapperProps} props
 * @return JSX.Element
 */
export const DecreePageWrapper: React.FC<DecreePageWrapperProps> = props => {
  const {
    isHeaderVisible = true,
    isFooterVisible = true,
    sampleIsOnLimit = false,
    headerType,
    color,
    children,
  } = props;
  return (
    <>
      {isHeaderVisible && (
        <DecreeHeader
          headerType={headerType}
          color={color}
          sampleIsOnLimit={sampleIsOnLimit}
        />
      )}
      {children}
      {isFooterVisible && <DecreeFooter />}
    </>
  );
};
