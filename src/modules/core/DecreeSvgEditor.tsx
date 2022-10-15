/* eslint-disable node/no-unsupported-features/node-builtins */
import clsx from 'clsx';
import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {ReactSVG} from 'react-svg';
import styled from 'styled-components';
import {DecreeSpinner} from './DecreeSpinner';
import {images} from '../../assets/images';
import {Dimensions, handleImageUpload} from './helpers/handle-image-upload';

export type SvgEditorElement = {
  id: string;
  text: string;
};

export type SvgEditorAttributes = {
  fontSize?: string;
  paperColor?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontColor?: string;
  waxSealMonogram?: string;
};

/**
 * @typedef DecreeSvgEditor
 */
type DecreeSvgEditorProps = {
  /** The original SVG file to be manipulated. It can be an import, or a url. */
  svgUrl: string;
  /** The elements to manipulate with the attributes */
  elements: SvgEditorElement[];
  /** The attributes of the SVG to manipulate */
  attributes: SvgEditorAttributes;
  /** The data for the uploaded logo */
  uploadedLogo?: string | null | undefined;
  /** The product has a logo available */
  productHasLogo?: boolean;
  /** Allows the editor to change all element colors inside the svg */
  isEditMode?: boolean;
  allowSaveToStorage?: boolean;
  isWaxSeal?: boolean;
  onSaveSvgChangesToStorage?: (
    stringifiedNotes: string,
    stringifiedAttributes: string
  ) => void;
  onSetSvgBlob?: (svgBlob: Blob) => void;
  shouldCenterText?: boolean;
};

/**
 * This component manipulates existing SVG passed through [svgUrl].
 * It determines what element to manipulate with [elementId].
 * The attributes of an element to be manipulated are passed through [attributes].
 *
 * How it works:
 * 1. svgRef stores a reference of the [svgUrl]
 * 2. [beforeInjection] is where we manipulate the given [elementId] with the given [attributes]
 * 3. whenever a prop changes, a rerender occurs, which also triggers [beforeInjection]
 * 4. the current state of the svg is then saved through [afterInjection]
 *
 * @example
 * This component is uncontrolled, therefore we should define a state outside of it.
 * const [elementId, setElementId] = useState("brides-name");
 * const [attributes, setAttributes] = useState({
 *  text: 'foobar', fill: '#000'
 * })
 * ...
 * <DecreeSvgEditor
 *  svgUrl="https://cdn.shopify.com/s/files/1/0562/0917/8780/files/sample.svg?v=1623832818"
 *  elementId={elementId}
 *  attributes={attributes}
 * />
 *
 * @component
 * @param {DecreeSvgEditorProps} props
 * @returns JSX.Element
 */
export const DecreeSvgEditor = (props: DecreeSvgEditorProps) => {
  const svgRef = useRef(props.svgUrl);

  // Contains the original logo value of the card
  // Only used in the products with logos
  const [originalLogo, setOriginalLogo] =
    useState<Element | null | undefined>();
  // Contains the original dimensions of the logo of the card
  // Only used in products with logos
  const [logoDimensions, setLogoDimensions] = useState<Dimensions>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  // Contains the initial values of elements
  const elementsRef = useRef(props.elements);
  // Contains the initial values of attributes
  const attributesRef = useRef(props.attributes);

  const hasChanges =
    !_.isEqual(elementsRef.current, props.elements) ||
    !_.isEqual(attributesRef.current, props.attributes);

  return (
    <div
      className={clsx({
        'w-188px': props.isWaxSeal,
        'min-w-full filter drop-shadow-card': !props.isWaxSeal,
      })}
    >
      {!props.svgUrl ? (
        // To prevent triggering of save to the localstorage
        <img src={images.decree_no_image} />
      ) : (
        <ReactSVGStyled
          src={svgRef.current}
          loading={() => <DecreeSpinner type="primary" />}
          beforeInjection={(svg: SVGSVGElement) => {
            // This should be called first so the colors can be overridden

            if (props.productHasLogo && props.isEditMode) {
              handleImageUpload(
                props.uploadedLogo || '',
                svg,
                logoDimensions,
                originalLogo,
                (element, coordinates) => {
                  setOriginalLogo(element);
                  setLogoDimensions(coordinates);
                }
              );
            }

            const allElements = svg.querySelectorAll('*');

            const fontColor = props.attributes.fontColor;

            if (allElements && fontColor) {
              allElements.forEach(element => {
                const hasStroke = element.getAttribute('stroke');
                const hasFill = element.getAttribute('fill');
                const isRect = element.nodeName === 'rect';
                const isGroup = element.nodeName === 'g';

                // disable feature for now
                // Only changes stroke if the property already has it
                // if (hasStroke) {
                element.setAttribute('stroke', fontColor);
                // }
                // Only changes the fill if the property already has it
                if (
                  hasFill &&
                  hasFill !== 'white' &&
                  hasFill !== '#fff' &&
                  hasFill?.toLowerCase() !== '#ffffff' &&
                  !isRect &&
                  !isGroup
                ) {
                  element.setAttribute('fill', fontColor);
                }
              });
            }
            // center texts everytime for greeting cards
            // if (props.shouldCenterText) {
            //   const tspan = svg.querySelector('tspan');
            //   if (tspan) {
            //     tspan.setAttribute('text-anchor', 'middle');
            //     tspan.setAttribute('x', '50%');
            //   }
            // }

            // This is going to get the first rect so no need for id
            const paperColor = props.attributes.paperColor;
            const rect = svg.querySelector('rect');
            if (rect && paperColor) {
              rect.setAttribute('fill', paperColor);
              rect.setAttribute('stroke', paperColor);
            }

            // Update the fields' text for all fields
            props.elements.forEach(({id, text}) => {
              const tspan = svg.querySelector(`tspan#${id}`);
              if (tspan) {
                tspan.textContent = text;
              }
            });

            // Loop through all elements and apply the attributes
            // All text styles apply to all editable elements (elements with id, or elements with id && contenteditable !== false)
            const allFields = svg.querySelectorAll('tspan');
            allFields.forEach(tspan => {
              // Dont edit any values with contenteditable = false
              if (tspan.getAttribute('contenteditable') !== 'false') {
                // Font color affects all the text in the SVG
                if (props.attributes.fontColor) {
                  tspan.setAttribute('fill', props.attributes.fontColor);
                }

                // comment out for now
                // if (tspan.id || props.isWaxSeal) {
                if (props.isWaxSeal) {
                  if (props.attributes.fontSize) {
                    tspan.setAttribute('font-size', props.attributes.fontSize);
                  }
                  if (props.attributes.fontFamily) {
                    tspan.setAttribute(
                      'font-family',
                      props.attributes.fontFamily
                    );
                  }
                  if (props.attributes.fontWeight) {
                    tspan.setAttribute(
                      'font-weight',
                      props.attributes.fontWeight
                    );
                  }
                  if (props.isWaxSeal) {
                    tspan.textContent =
                      props?.attributes?.waxSealMonogram || '';
                  }
                }
              }
            });

            // For wax seals
            if (props.isWaxSeal) {
              const circle = svg.querySelector('circle');
              if (circle && paperColor) {
                circle.setAttribute('fill', paperColor);
              }
            }
          }}
          afterInjection={(
            err: Error | null,
            svg: SVGSVGElement | undefined
          ) => {
            if (!svg) return;

            // Handles Business Cards
            // Place in after injection or the bounding rects will be 0
            if (props.productHasLogo) {
              handleImageUpload(
                props.uploadedLogo || '',
                svg,
                logoDimensions,
                originalLogo,
                (element, coordinates) => {
                  setOriginalLogo(element);
                  setLogoDimensions(coordinates);
                }
              );
            }

            // Save the current state of the SVG DOM
            const serializer = new XMLSerializer();
            const svgBlob = new Blob([serializer.serializeToString(svg)], {
              type: 'image/svg+xml',
            });
            svgRef.current = URL.createObjectURL(svgBlob);

            // Don't save if no changes were made or if it hasn't been initialized yet
            // This is to prevent saving the default values on load, overriding the previous edits
            if (hasChanges || props.allowSaveToStorage) {
              props.onSaveSvgChangesToStorage?.(
                JSON.stringify(props.elements),
                JSON.stringify(props.attributes)
              );
            }

            // Set the svg blob
            props.onSetSvgBlob?.(svgBlob);
          }}
        />
      )}
    </div>
  );
};

const ReactSVGStyled = styled(ReactSVG)`
  div > svg {
    width: 100%;
    height: 100%;
  }
`;
