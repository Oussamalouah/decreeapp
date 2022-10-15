import React, {useState} from 'react';
import {Layer, Line, Rect, Stage} from 'react-konva';
import tw from 'tailwind-styled-components/dist/tailwind';

import {
  CustomizationLayout,
  CustomizationLayoutGrid,
} from './shared/customization-layout.components';
import {DecreeText} from '../../core/DecreeText';
import {DecreeButton} from '../../core/DecreeButton';
import {LandscapeIcon, PortraitIcon} from '../../../assets/svg';
import {LabelledDropdown} from './shared/LabelledDropdown';
import {ColorPicker} from './shared/ColorPicker';
import {FontInput} from './shared/FontInput';
import {Toolbar} from './shared/ToolBar';
import {CustomCardText} from './custom-card/CustomCardText';
import {CustomCardLine} from './custom-card/CustomCardLine';
import {CustomImage} from './custom-card/CustomImage';
import {AlignmentPicker} from './shared/AlignmentPicker';
import {CustomBox} from './custom-card/CustomBox';
import clsx from 'clsx';
import {SymbolsMenu} from './custom-card/SymbolsMenu';
import {CustomCircle} from './custom-card/CustomCircle';
import {
  EditModes,
  ElementNames,
  PaperOrientation,
  ShapeSettings,
} from '../models/CustomCardElements';
import {CustomStraightLine} from './custom-card/CustomStraightLine';
import {formatPrice} from '../../../utils/format-price';
import {StationeryPreview} from './shared/sections/StationeryPreview';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import pencilIcon from '../../../assets/svg/toolbar_pencil.svg';
import _ from 'lodash';
import {CustomCardCustomizationScreenProps} from '../models/CustomCardCustomizationScreenProps';

export const CustomCardCustomizationScreen = (
  props: CustomCardCustomizationScreenProps
) => {
  const [isSymbolsMenuVisible, setIsSymbolsMenuVisible] = useState(
    props.editMode === EditModes.SYMBOLS
  );

  const userClickedShape = (shapeSettings: ShapeSettings, name: string) => {
    props.userClickedObj(name);
    props.userClickedShapeSetting(shapeSettings);
    if (name.includes(ElementNames.CIRCLE)) {
      props.userClickedToolbarItem(EditModes.CIRCLE);
    } else {
      props.userClickedToolbarItem(EditModes.BOX);
    }
  };

  return (
    <CustomizationLayout breadcrumbTag="">
      <CustomizationLayoutGrid
        leftColumn={
          <div
            id="react-konva-div-container"
            className="focus:outline-none relative"
            tabIndex={1}
            ref={props.outerStageRef}
            // adding padding here breaks the position of textarea
            onKeyUp={props.onContainerKeyUp}
          >
            <StationeryPreview
              containerClassName="py-11"
              isZoomDisabled={props.loading}
              isDoubleClickDisabled={true}
              isPanningDisabled={props.editMode !== EditModes.SELECT}
              otherChildren={
                <Toolbar
                  loading={props.loading}
                  orientation={props.paperSettings.orientation}
                  editMode={props.editMode}
                  isDisabled={props.loading}
                  onClick={editMode => {
                    props.userClickedToolbarItem(editMode);
                    setIsSymbolsMenuVisible(editMode === EditModes.SYMBOLS);
                    props.userClickedObj('');
                  }}
                />
              }
            >
              <div className={clsx([{hidden: !props.loading}])}>
                <DecreeSpinner type="primary" />
              </div>
              <div className={clsx([{hidden: props.loading}])}>
                <Stage
                  ref={props.stageRef}
                  width={props.paperSettings.dimensions.width}
                  height={props.paperSettings.dimensions.height}
                  style={{
                    backgroundColor: props.paperSettings.color,
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.11))',
                    zIndex: 10,
                    cursor:
                      props.editMode === EditModes.BOX ||
                      props.editMode === EditModes.CIRCLE ||
                      props.editMode === EditModes.TEXT ||
                      props.editMode === EditModes.LINE
                        ? 'crosshair'
                        : props.editMode === EditModes.PENCIL
                        ? `url(${pencilIcon}), auto`
                        : 'grab',
                  }}
                  onTouchStart={props.onStageMouseDown}
                  onTouchMove={props.onStageMove}
                  onTouchEnd={props.onStageMouseUp}
                  onMouseDown={props.onStageMouseDown}
                  onMouseMove={props.onStageMove}
                  onMouseUp={props.onStageMouseUp}
                >
                  <Layer>
                    <Rect
                      ref={props.backgroundRef}
                      width={props.paperSettings.dimensions.width}
                      height={props.paperSettings.dimensions.height}
                      fill={props.paperSettings.color}
                      visible={false}
                    />
                    {/* Handles the drawing of the pencil */}
                    {props.lines.map(line => (
                      <CustomCardLine
                        key={line.name}
                        line={line}
                        editMode={props.editMode}
                        pencilSettings={props.pencilSettings}
                        isSelected={line.name === props.selectedObjName}
                        userClickedLine={() => {
                          props.userClickedObj(line.name);
                        }}
                        setLines={props.setLines}
                      />
                    ))}
                    {/* Handles the addition of new texts */}
                    {props.texts.map(text => (
                      <CustomCardText
                        key={text.name}
                        text={text}
                        settings={props.textSettings}
                        editMode={props.editMode}
                        isSelected={text.name === props.selectedObjName}
                        userClickedText={textSettings => {
                          props.userClickedObj(text.name);
                          props.userClickedTextSetting(textSettings);
                          props.userClickedToolbarItem(EditModes.TEXT);
                        }}
                        userDoubleClickedText={props.userDoubleClickedText}
                        setTexts={props.setTexts}
                      />
                    ))}
                    {props.images.map(img => (
                      <CustomImage
                        key={img.name}
                        image={img}
                        isSelected={img.name === props.selectedObjName}
                        userClickedImage={() => {
                          props.userClickedObj(img.name);
                          props.userClickedToolbarItem(EditModes.SYMBOLS);
                        }}
                        setImages={props.setImages}
                      />
                    ))}
                    {props.boxes.map(box => (
                      <CustomBox
                        key={box.name}
                        box={box}
                        settings={props.shapeSettings}
                        isSelected={box.name === props.selectedObjName}
                        userClickedBox={userClickedShape}
                        setBoxes={props.setBoxes}
                      />
                    ))}
                    {props.circles.map(circle => (
                      <CustomCircle
                        key={circle.name}
                        circle={circle}
                        settings={props.shapeSettings}
                        isSelected={circle.name === props.selectedObjName}
                        userClickedCircle={userClickedShape}
                        setCircles={props.setCircles}
                      />
                    ))}
                    {props.straightLines.map(straightLine => (
                      <CustomStraightLine
                        settings={props.lineSettings}
                        key={straightLine.name}
                        straightLine={straightLine}
                        isSelected={straightLine.name === props.selectedObjName}
                        userClickedStraightLine={() => {
                          props.userClickedObj(straightLine.name);
                          props.userClickedToolbarItem(EditModes.LINE);
                        }}
                        setStraightLines={props.setStraightLines}
                      />
                    ))}
                    {props.newAnnotation && (
                      <Rect
                        fill="#dbf0fd"
                        x={props.newAnnotation.x}
                        y={props.newAnnotation.y}
                        width={props.newAnnotation.width}
                        height={props.newAnnotation.height}
                        stroke="#9fd7fb"
                      />
                    )}
                    {props.newStraightLineAnnotation && (
                      <Line
                        dashEnabled={props.lineSettings.lineBond === 'Dashed'}
                        dash={[10, 10]}
                        x={props.newStraightLineAnnotation.x}
                        y={props.newStraightLineAnnotation.y}
                        points={[
                          0,
                          0,
                          props.newStraightLineAnnotation.nextX,
                          props.newStraightLineAnnotation.nextY,
                        ]}
                        stroke={props.lineSettings.strokeColor}
                      />
                    )}
                  </Layer>
                </Stage>
                <textarea
                  ref={props.textAreaRef}
                  value={props.textAreaValue}
                  onChange={props.onTextAreaChange}
                  style={{
                    display: props.isTextAreaVisible ? 'block' : 'none',
                    position: 'absolute',
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    top: props.selectedTextProperties?.attrs.y,
                    left: props.selectedTextProperties?.attrs.x,
                    resize: 'none',
                    fontSize:
                      props.selectedTextProperties?.attrs.fontSize + 'px',
                    width: props.selectedTextProperties?.getSize().width,
                    height: props.selectedTextProperties?.getSize().height,
                    fontFamily: props.textSettings.family,
                    textAlign: props.textSettings.alignment,
                    letterSpacing:
                      _.parseInt(props.textSettings.letterSpacing) || 1,
                    lineHeight: _.parseInt(props.textSettings.lineHeight) || 1,
                    transform: `rotate(${props.selectedTextProperties?.getAbsoluteRotation()}deg)`,
                    transformOrigin: 'left top',
                  }}
                  onBlur={props.onTextAreaBlur}
                />
              </div>
            </StationeryPreview>
          </div>
        }
        rightColumn={
          <>
            <div className="text-left">
              <DecreeText
                size={23}
                className="font-serif font-bold text-blue-dark"
              >
                {props.stationeryTitle}
              </DecreeText>
              <DecreeText
                size={14}
                className="font-serif text-gold font-bold tracking-[0.075em] uppercase"
              >
                {props.stationeryType}
              </DecreeText>
            </div>
            <div className="flex justify-start mb-8 space-x-4 my-4">
              <DecreeButton
                className={clsx([
                  'flex items-center justify-center',
                  {'cursor-not-allowed': props.loading},
                ])}
                onClick={props.userClickedAddToCart}
                disabled={props.loading}
              >
                {!props.isEditMode ? 'Add to Cart' : 'Update Item'}
              </DecreeButton>
              <div className="group">
                <DecreeButton
                  className={clsx([{'cursor-not-allowed': props.loading}])}
                  mode="secondary"
                  type="button"
                  onClick={props.userClickedGetProof}
                  disabled={props.loading}
                >
                  Get a Proof
                </DecreeButton>
                <div className="hidden group-hover:block absolute bg-blue-light w-[333px] p-4 border border-blue-dark mt-4 rounded-md z-20">
                  <DecreeText size={12} className="font-sans leading-7">
                    We are happy to provide a proof of the actual card you
                    designed. This ensures you are completely satisfied with
                    your design. There is a nominal charge for this service and
                    if you purchase stationery from us, the price of the proof
                    is removed from the cost of the stationery.
                  </DecreeText>
                </div>
              </div>
              <DecreeButton
                className={clsx([{'cursor-not-allowed': props.loading}])}
                mode="text"
                disabled={props.loading}
                onClick={props.userClickedReset}
              >
                Reset
              </DecreeButton>
            </div>
            <div>
              <DecreeText
                size={23}
                className="font-serif font-bold text-blue-dark"
              >
                <span>Total:</span>
                <span className="ml-2">{formatPrice(props.totalPrice)}</span>
              </DecreeText>
            </div>
            <div className="space-y-6">
              <div className="w-full h-[1px] bg-gray" />
              {/* Paper mode */}
              <SettingsWrapper $isHidden={props.editMode !== EditModes.PAPER}>
                <div className="flex items-center space-x-4 cursor-pointer">
                  <div
                    className={clsx([
                      'p-px border',
                      {
                        'border-white':
                          props.paperSettings.orientation !==
                          PaperOrientation.PORTRAIT,
                      },
                    ])}
                    onClick={() =>
                      props.userClickedPaperSetting({
                        orientation: PaperOrientation.PORTRAIT,
                      })
                    }
                  >
                    <PortraitIcon />
                  </div>
                  <div
                    className={clsx([
                      'p-px border',
                      {
                        'border-white':
                          props.paperSettings.orientation !==
                          PaperOrientation.LANDSCAPE,
                      },
                    ])}
                    onClick={() =>
                      props.userClickedPaperSetting({
                        orientation: PaperOrientation.LANDSCAPE,
                      })
                    }
                  >
                    <LandscapeIcon />
                  </div>
                </div>
                <DecreeText size={16} className="text-blue-dark">
                  Paper Weight: 600 lb
                </DecreeText>
                <LabelledDropdown
                  items={props.paperOptions.sizes}
                  label="Paper Size"
                  value={props.paperSettings.size}
                  onSelect={size => props.userClickedPaperSetting({size})}
                />
                <ColorPicker
                  colors={props.paperOptions.colors}
                  label="Paper Color"
                  activeColor={props.paperSettings.color}
                  onClick={color => props.userClickedPaperSetting({color})}
                />
                <LabelledDropdown
                  items={props.paperOptions.quantities}
                  label="Quantity"
                  value={props.paperSettings.quantity}
                  onSelect={quantity =>
                    props.userClickedPaperSetting({quantity})
                  }
                />
              </SettingsWrapper>
              {/* Pencil mode */}
              <SettingsWrapper $isHidden={props.editMode !== EditModes.PENCIL}>
                <ColorPicker
                  colors={props.pencilOptions.strokeColors}
                  label="Pencil Color"
                  activeColor={props.pencilSettings.strokeColor}
                  onClick={strokeColor =>
                    props.userClickedPencilSetting({strokeColor})
                  }
                />
              </SettingsWrapper>
              {/* Text mode */}
              <SettingsWrapper $isHidden={props.editMode !== EditModes.TEXT}>
                <ColorPicker
                  colors={props.textOptions.colors}
                  label="Font Color"
                  activeColor={props.textSettings.color}
                  onClick={color => props.userClickedTextSetting({color})}
                />
                <LabelledDropdown
                  label="Font"
                  items={props.textOptions.families}
                  value={props.textSettings.family}
                  onSelect={family => props.userClickedTextSetting({family})}
                />
                <div className="grid grid-cols-2">
                  <FontInput
                    label="Font Size"
                    fontSize={props.textSettings.size}
                    sizeType="px"
                    size="short"
                    onClick={size => props.userClickedTextSetting({size})}
                  />
                  <LabelledDropdown
                    label="Font Weight"
                    items={props.textOptions.weights}
                    size="short"
                    onSelect={weight => props.userClickedTextSetting({weight})}
                    value={props.textSettings.weight}
                  />
                </div>
                <div className="grid grid-cols-2">
                  <LabelledDropdown
                    label="Line Height"
                    items={props.textOptions.lineHeights}
                    value={props.textSettings.lineHeight}
                    size="short"
                    onSelect={lineHeight =>
                      props.userClickedTextSetting({lineHeight})
                    }
                  />
                  <LabelledDropdown
                    label="Letter Spacing"
                    items={props.textOptions.letterSpacings}
                    size="short"
                    onSelect={letterSpacing =>
                      props.userClickedTextSetting({letterSpacing})
                    }
                    value={props.textSettings.letterSpacing}
                  />
                </div>
                <AlignmentPicker
                  label="Alignment"
                  activeAlignment={props.textSettings.alignment}
                  onClick={alignment =>
                    props.userClickedTextSetting({alignment})
                  }
                />
              </SettingsWrapper>
              {/* Line mode */}
              <SettingsWrapper $isHidden={props.editMode !== EditModes.LINE}>
                <ColorPicker
                  colors={props.lineSettingsOptions.strokeColors}
                  label="Line Color"
                  activeColor={props.lineSettings.strokeColor}
                  onClick={strokeColor =>
                    props.userClickedLineSetting({strokeColor})
                  }
                />
                <LabelledDropdown
                  label="Line Bond"
                  items={props.lineSettingsOptions.lineBonds}
                  value={props.lineSettings.lineBond}
                  onSelect={lineBond =>
                    props.userClickedLineSetting({lineBond})
                  }
                />
              </SettingsWrapper>
              {/* Box and circle mode */}
              <SettingsWrapper
                $isHidden={
                  props.editMode !== EditModes.BOX &&
                  props.editMode !== EditModes.CIRCLE
                }
              >
                <ColorPicker
                  colors={props.shapeOptions.fillColors}
                  label="Fill Color"
                  activeColor={props.shapeSettings.fillColor}
                  onClick={fillColor =>
                    props.userClickedShapeSetting({fillColor})
                  }
                />
                <ColorPicker
                  colors={props.shapeOptions.strokeColors}
                  label="Stroke Color"
                  activeColor={props.shapeSettings.strokeColor}
                  onClick={strokeColor =>
                    props.userClickedShapeSetting({strokeColor})
                  }
                />
                <FontInput
                  label="Stroke"
                  onClick={strokeWidth =>
                    props.userClickedShapeSetting({strokeWidth})
                  }
                  fontSize={props.shapeSettings.strokeWidth}
                  sizeType="px"
                />
              </SettingsWrapper>
              <SymbolsMenu
                isVisible={isSymbolsMenuVisible}
                isLoading={props.loading}
                glyphs={props.glyphs}
                symbols={props.symbols}
                userClickedItem={props.userAddedImage}
                userClickedCloseMenu={() => setIsSymbolsMenuVisible(false)}
              />
            </div>
          </>
        }
      />
    </CustomizationLayout>
  );
};

const SettingsWrapper = tw.div<{$isHidden: boolean}>`
  space-y-5
  relative
  ${p => (p.$isHidden ? 'hidden' : 'block')}
`;
