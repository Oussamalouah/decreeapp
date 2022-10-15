import _ from 'lodash';
import clsx from 'clsx';
import React, {useState} from 'react';
import Draggable from 'react-draggable';
import tw from 'tailwind-styled-components/dist/tailwind';

import {DecreeText} from '../../../core/DecreeText';
import {SymbolsMoveIcon, SymbolsXIcon} from '../../../../assets/svg';
import {ProductEdges} from '../../../store/containers/StoreScreenContainer';
import {populateArray} from '../../../../utils/populate-array';
import {DecreeSpinner} from '../../../core/DecreeSpinner';

type Props = {
  isVisible?: boolean;
  isLoading?: boolean;
  glyphs: ProductEdges;
  symbols: ProductEdges;
  userClickedItem: (src: string) => void;
  userClickedCloseMenu: () => void;
};

const maxColumns = 9;

export const SymbolsMenu = (props: Props) => {
  const [isDraggingDisabled, setIsDraggingDisabled] = useState(true);

  const glyphs = populateArray(
    props.glyphs,
    maxColumns - (props.glyphs.length % maxColumns)
  );
  const symbols = populateArray(
    props.symbols,
    maxColumns - (props.symbols.length % maxColumns)
  );

  return (
    <div className={clsx([{hidden: !props.isVisible}])}>
      <Draggable disabled={isDraggingDisabled} bounds="body">
        <div className="bg-blue-dark rounded px-3 py-2 max-w-max min-w-[249px]">
          <div className="space-y-2">
            <div className="relative">
              <SymbolsXIcon
                className="cursor-pointer"
                onClick={props.userClickedCloseMenu}
              />
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onMouseUpCapture={() => setIsDraggingDisabled(true)}
                onMouseDownCapture={() => setIsDraggingDisabled(false)}
              >
                <SymbolsMoveIcon />
              </div>
            </div>
            <Wrapper $shouldHide={!props.isLoading}>
              <DecreeSpinner type="secondary" />
            </Wrapper>
            {/* Hidden if glyphs is empty */}
            <Wrapper $shouldHide={_.isEmpty(props.glyphs) || !!props.isLoading}>
              <DecreeText size={16} className="text-white">
                Glyphs
              </DecreeText>
              <div className="grid grid-cols-9">
                {glyphs.map((glyph, i) => (
                  <Box
                    key={i}
                    $isEmpty={!glyph}
                    onClick={() => {
                      if (glyph) {
                        props.userClickedItem(glyph.node.description);
                      }
                    }}
                  >
                    {glyph ? (
                      <img
                        src={glyph.node.description}
                        alt={glyph.node.title}
                      />
                    ) : null}
                  </Box>
                ))}
              </div>
            </Wrapper>
            {/* Hidden if symbols is empty */}
            <Wrapper $shouldHide={_.isEmpty(props.glyphs) || !!props.isLoading}>
              <DecreeText size={16} className="text-white">
                Symbols
              </DecreeText>
              <div className="grid grid-cols-9">
                {symbols.map((symbol, i) => (
                  <Box
                    key={i}
                    $isEmpty={!symbol}
                    onClick={() => {
                      if (symbol) {
                        props.userClickedItem(symbol.node.description);
                      }
                    }}
                  >
                    {symbol ? (
                      <img
                        src={symbol.node.description}
                        alt={symbol.node.title}
                      />
                    ) : null}
                  </Box>
                ))}
              </div>
            </Wrapper>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

const Wrapper = tw.div<{$shouldHide: boolean}>`
  space-y-1
  ${p => (p.$shouldHide ? 'hidden' : 'block')}
`;

const Box = tw.div<{$isEmpty: boolean}>`
  h-[25px] w-[25px]
  flex items-center justify-center
  bg-blue-light border-[0.5px] border-blue-dark
  ${p => (p.$isEmpty ? 'cursor-not-allowed' : 'cursor-pointer')}
`;
