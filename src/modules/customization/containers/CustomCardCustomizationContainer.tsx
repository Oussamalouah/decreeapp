import _ from 'lodash';
import Konva from 'konva';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {useQuery} from '@apollo/client';
import {useHistory, useLocation, useParams} from 'react-router-dom';

import {QueryProps} from '../../store/containers/StoreScreenContainer';
import {PRODUCTS_QUERY} from '../../../api/operations/queries/store';
import {productTypes} from '../../../utils/constants/product-type.constants';
import {
  useCheckoutData,
  useProductByHandleData,
  useProductData,
} from '../../../utils/hooks/query-hooks';
import {
  AnnotationProps,
  BoxProps,
  CircleProps,
  EditModes,
  ElementNames,
  ElementsArray,
  ImageProps,
  LineProps,
  LineSettings,
  PaperDimensions,
  PaperOrientation,
  PaperSettings,
  PencilSettings,
  ShapeSettings,
  StraightLineAnnotationProps,
  StraightLineProps,
  TextProps,
  TextSettings,
} from '../models/CustomCardElements';
import {getCustomCardOptions} from './helpers/get-custom-card-options';
import {Environment} from '../../../Environment';
import {
  useAddCheckoutLineItems,
  useCreateCheckout,
  useUpdateCheckoutLineItems,
} from '../../../utils/hooks/mutation-hooks';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {toast} from 'react-toastify';
import {isMobile} from 'react-device-detect';
import {bespokeCategories} from '../../../utils/constants/store.contants';
import {routes} from '../../../route-list';
import {productHandles} from '../../../utils/constants/product-handle.constants';
import {getLineItem} from './helpers/get-line-item';
import {getCustomCardSvgUrl} from './helpers/get-custom-card-svg-url';
import {getParseCustomCardAttributes} from './helpers/get-parse-custom-card-attributes';
import {CustomCardCustomizationScreenProps} from '../models/CustomCardCustomizationScreenProps';
import {getCustomCardDataUrl} from './helpers/get-custom-card-data-url';
import {customCardStorage} from '../../../utils/constants/custom-card-storage.constants';
import {getGoogleClientId} from '../../../utils/get-google-client-id';

export const CustomCardCustomizationContainer =
  (Screen: React.VFC<CustomCardCustomizationScreenProps>) => () => {
    const {services} = Environment.current();

    const history = useHistory();
    const {search} = useLocation();
    const {itemId} = useParams<{itemId: string}>();
    const {productData, loadingProductData} = useProductByHandleData(
      productHandles.customCard
    );
    const {loading: loadingSymbols, data: symbolsData} = useQuery<QueryProps>(
      PRODUCTS_QUERY,
      {
        variables: {query: `product_type:${productTypes.SYMBOL}`},
        fetchPolicy: 'cache-and-network',
      }
    );
    const {loading: loadingGlyphs, data: glyphsData} = useQuery<QueryProps>(
      PRODUCTS_QUERY,
      {
        variables: {query: `product_type:${productTypes.GLYPH}`},
        fetchPolicy: 'cache-and-network',
      }
    );

    const {
      productData: sampleStationeryData,
      loadingProductData: loadingSampleStationeryData,
    } = useProductByHandleData(productHandles.sample_stationery);

    const {
      pencilSettingsOptions,
      shapeSettingsOptions,
      textSettingsOptions,
      paperSettingsOptions,
      initialShapeSettings,
      initialPencilSettings,
      initialTextSettings,
      initialPaperSettings,
      lineSettingsOptions,
      initialLineSettings,
    } = getCustomCardOptions(productData?.productByHandle);

    // States
    const [isUploadingSvg, setIsUploadingSvg] = useState(false);
    const [productVariantIndex, setProductVariantIndex] = useState(0);
    const [sampleIsOnLimit, setSampleIsOnLimit] = useState(false);

    // Settings
    const [pencilSettings, setPencilSettings] = useState<PencilSettings>(
      initialPencilSettings
    );
    const [paperSettings, setPaperSettings] =
      useState<PaperSettings>(initialPaperSettings);
    const [textSettings, setTextSettings] =
      useState<TextSettings>(initialTextSettings);
    const [shapeSettings, setShapeSettings] =
      useState<ShapeSettings>(initialShapeSettings);
    const [lineSettings, setLineSettings] =
      useState<LineSettings>(initialLineSettings);

    const [selectedObjName, setSelectedObjName] = useState('');
    const [editMode, setEditMode] = useState<EditModes>(EditModes.SELECT);
    const [lines, setLines] = useState<LineProps[]>([]);
    const [texts, setTexts] = useState<TextProps[]>([]);
    const [images, setImages] = useState<ImageProps[]>([]);
    const [boxes, setBoxes] = useState<BoxProps[]>([]);
    const [circles, setCircles] = useState<CircleProps[]>([]);
    const [straightLines, setStraightLines] = useState<StraightLineProps[]>([]);

    const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
    const [selectedTextProperties, setSelectedTextProperties] =
      useState<Konva.Node | null>(null);
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    // Refs
    const originalPaperDimensionsRef = useRef<PaperDimensions>(
      paperSettings.dimensions
    );
    const isDrawing = useRef(false);
    const stageRef = useRef<Konva.Stage>(null);
    const uploadRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const backgroundRef = useRef<Konva.Rect>(null);
    const outerStageRef = useRef<HTMLDivElement>(null);

    // Annotations state , can be used for drawing squares
    const [newAnnotation, setNewAnnotation] =
      useState<AnnotationProps | null>(null);

    // Straight line annotation
    const [newStraightLineAnnotation, setNewStraightLineAnnotation] =
      useState<StraightLineAnnotationProps | null>(null);

    // Annotation functions

    // Handles initial position of annotation on mouse down
    const handleStartAnnotation = useCallback(
      (x: number, y: number, type: EditModes) => {
        setNewAnnotation({
          x,
          y,
          width: 0,
          height: 0,
          type,
        });
      },
      []
    );

    // Handles annotation width and height to make a square
    const handleMoveAnnotation = useCallback(
      (width: number, height: number) => {
        setNewAnnotation(prev => {
          if (!prev) return null;
          return {
            ...prev,
            width,
            height,
          };
        });
      },
      []
    );

    // Resets all element arrays
    const resetElements = (args?: ElementsArray) => {
      setBoxes(args?.boxes || []);
      setCircles(args?.circles || []);
      setStraightLines(args?.straightLines || []);
      setTexts(args?.texts || []);
      setLines(args?.lines || []);
      setImages(args?.images || []);
    };

    // Resets persisted storage settings
    const resetStorageSettings = () => {
      stageRef.current?.children?.[0].children?.forEach(child => {
        if (child.attrs?.name) {
          services.storage.deleteItem(child.attrs.name);
        }
      });
    };

    // Resets all settings to its initial value
    const resetSettings = () => {
      setPencilSettings(initialPencilSettings);
      setShapeSettings(initialShapeSettings);
      setTextSettings(initialTextSettings);
      setPaperSettings(initialPaperSettings);
    };

    /**
     * MUTATION OPERATIONS
     */

    // Mutation to add a checkout line item
    const {addCheckoutLineItems, loadingCheckoutAddLineItems} =
      useAddCheckoutLineItems();
    // Mutation to update
    const {updateCheckoutLineItems, loadingCheckoutUpdateLineItems} =
      useUpdateCheckoutLineItems();

    const {checkoutData, loadingCheckoutData} = useCheckoutData();

    const {createCheckout, loadingCheckoutCreate} = useCreateCheckout();

    // Variables
    const lineItems = getLineItem({search, checkoutData});
    const productLineItem = lineItems?.productLineItem;
    const isEditMode = !!search && !!productLineItem;

    // Creates a new checkout if checkout is empty
    useEffect(() => {
      if (!checkoutData?.node.id) {
        createCheckout({
          variables: {input: {lineItems: []}},
        });
      }
    }, [loadingCheckoutData]);

    // Checks if user has exceeded max amount of samples
    useEffect(() => {
      const totalSamples =
        checkoutData?.node?.lineItems.edges.filter(
          item => item.node.variant?.product.productType === productTypes.SAMPLE
        )?.length || 0;

      setSampleIsOnLimit(totalSamples >= 5);
    }, [checkoutData]);

    // Gets the variant index
    useEffect(() => {
      if (paperSettings && productData?.productByHandle) {
        const newVariantIndex =
          productData?.productByHandle?.variants?.edges?.findIndex(
            variant => variant.node.title === paperSettings.size
          );
        setProductVariantIndex(newVariantIndex || 0);
      }
    }, [paperSettings, productData?.productByHandle]);

    // Handles keyup issues when loading images
    useEffect(() => {
      if (outerStageRef.current) {
        outerStageRef.current.focus();
      }
    }, [images, outerStageRef.current]);

    // Handles the appearance of the text area if text is edited
    useEffect(() => {
      if (stageRef.current && selectedObjName && editMode === EditModes.TEXT) {
        const selectedText = stageRef.current?.findOne(`.${selectedObjName}`);
        setTextAreaValue(selectedText?.attrs.text);
        setSelectedTextProperties(selectedText ? selectedText : null);
      }
    }, [stageRef.current, selectedObjName, editMode]);

    // Sets height and width of the paper depending on orientation
    useEffect(() => {
      if (paperSettings.orientation === PaperOrientation.LANDSCAPE) {
        setPaperSettings(prev => ({
          ...prev,
          dimensions: {
            height: originalPaperDimensionsRef.current.width,
            width: originalPaperDimensionsRef.current.height,
          },
        }));
      } else {
        setPaperSettings(prev => ({
          ...prev,
          dimensions: {
            height: originalPaperDimensionsRef.current.height,
            width: originalPaperDimensionsRef.current.width,
          },
        }));
      }
    }, [paperSettings.orientation]);

    // Makes sure the selected element is always on top
    useEffect(() => {
      const selectedElements = stageRef.current?.find(`.${selectedObjName}`);

      if (selectedElements) {
        selectedElements
          .sort((firstEl, secondEl) => {
            // Make sure transformer is always last in the array
            // so the it will always be moved to the top
            if (firstEl.getClassName() === 'Transformer') {
              return 1;
            } else if (secondEl.getClassName() === 'Transformer') {
              return -1;
            } else {
              return 0;
            }
          })
          .forEach(element => {
            element.moveToTop();
          });
      }
    }, [selectedObjName]);

    // Reset initial state of settings
    useEffect(() => {
      resetSettings();
    }, [loadingProductData]);

    // Redirects screen if on mobile
    useEffect(() => {
      if (isMobile) {
        history.replace(routes.STORE__VIEW(bespokeCategories[0].id));
        toast.error('Mobile view for this is not yet available');
      }
    }, [isMobile]);

    // Persist on edit
    useEffect(() => {
      if (isEditMode && productLineItem) {
        const customCardElementsData =
          productLineItem.node.customAttributes.find(
            attr => attr.key === customAttributeFields.CUSTOM_CARD_DATA
          );
        const customCardPaperSettingsData =
          productLineItem.node.customAttributes.find(
            attr =>
              attr.key === customAttributeFields.CUSTOM_CARD_PAPER_SETTINGS
          );

        if (customCardElementsData?.value) {
          const elementValues = getParseCustomCardAttributes(
            customCardElementsData.value
          );

          resetElements(elementValues);
        }

        if (customCardPaperSettingsData?.value) {
          setPaperSettings(JSON.parse(customCardPaperSettingsData.value));
        }
      }
    }, [isEditMode, productLineItem]);

    // Persist locally
    useEffect(() => {
      if (!isEditMode) {
        if (
          boxes.length ||
          circles.length ||
          straightLines.length ||
          texts.length ||
          lines.length ||
          images.length
        ) {
          services.storage.storeItem(
            customCardStorage.PERSISTENCE_DATA,
            JSON.stringify({
              boxes,
              circles,
              straightLines,
              texts,
              lines,
              images,
            })
          );
        } else {
          services.storage.deleteItem(customCardStorage.PERSISTENCE_DATA);
        }
      }
    }, [boxes, circles, straightLines, texts, lines, images, isEditMode]);

    useEffect(() => {
      if (
        JSON.stringify(paperSettings) !==
          JSON.stringify(initialPaperSettings) &&
        !isEditMode
      ) {
        services.storage.storeItem(
          customCardStorage.PAPER_SETTINGS,
          JSON.stringify(paperSettings)
        );
      }
    }, [paperSettings, isEditMode]);

    useLayoutEffect(() => {
      const customCardPersistenceData = services.storage.getItem(
        customCardStorage.PERSISTENCE_DATA
      );
      if (customCardPersistenceData && !isEditMode) {
        const parsedPersistenceData = getParseCustomCardAttributes(
          customCardPersistenceData
        );

        resetElements(parsedPersistenceData);
      }
    }, []);

    return (
      <Screen
        stationeryTitle={
          productData?.productByHandle.title || 'Name of Stationery Here'
        }
        stationeryType={
          productData?.productByHandle.subtitle?.value || 'Bespoke Stationery'
        }
        symbols={symbolsData?.products?.edges || []}
        glyphs={glyphsData?.products?.edges || []}
        selectedObjName={selectedObjName}
        stageRef={stageRef}
        uploadRef={uploadRef}
        textAreaRef={textAreaRef}
        backgroundRef={backgroundRef}
        outerStageRef={outerStageRef}
        editMode={editMode}
        lines={lines}
        texts={texts}
        images={images}
        boxes={boxes}
        circles={circles}
        straightLines={straightLines}
        pencilSettings={pencilSettings}
        pencilOptions={pencilSettingsOptions}
        shapeSettings={shapeSettings}
        lineSettings={lineSettings}
        shapeOptions={shapeSettingsOptions}
        lineSettingsOptions={lineSettingsOptions}
        paperSettings={paperSettings}
        paperOptions={paperSettingsOptions}
        textSettings={textSettings}
        textOptions={textSettingsOptions}
        isTextAreaVisible={isTextAreaVisible}
        selectedTextProperties={selectedTextProperties}
        textAreaValue={textAreaValue}
        newAnnotation={newAnnotation}
        newStraightLineAnnotation={newStraightLineAnnotation}
        loading={
          loadingProductData ||
          loadingCheckoutAddLineItems ||
          loadingCheckoutUpdateLineItems ||
          loadingCheckoutData ||
          loadingCheckoutCreate ||
          loadingGlyphs ||
          loadingSymbols ||
          loadingSampleStationeryData ||
          isUploadingSvg
        }
        isEditMode={isEditMode}
        totalPrice={
          (productData?.productByHandle.variants.edges[productVariantIndex]
            ?.node?.priceV2.amount || 0) *
          (_.parseInt(paperSettings.quantity) || 0)
        }
        setBoxes={setBoxes}
        setTexts={setTexts}
        setLines={setLines}
        setImages={setImages}
        setCircles={setCircles}
        setStraightLines={setStraightLines}
        userAddedImage={src => {
          const name = `image${images.length + 1}`;
          setImages(prev => [...prev, {name, src}]);
        }}
        userClickedObj={name => {
          if (editMode !== EditModes.PENCIL) {
            setSelectedObjName(name);
          }
        }}
        userDoubleClickedText={() => {
          setIsTextAreaVisible(true);
          textAreaRef.current?.select();
          selectedTextProperties?.hide();
        }}
        userClickedPencilSetting={setting => {
          setPencilSettings(prev => ({...prev, ...setting}));
        }}
        userClickedLineSetting={setting => {
          setLineSettings(prev => ({...prev, ...setting}));
        }}
        userClickedShapeSetting={setting => {
          setShapeSettings(prev => ({...prev, ...setting}));
        }}
        userClickedPaperSetting={setting => {
          setPaperSettings(prev => ({...prev, ...setting}));
        }}
        userClickedTextSetting={setting => {
          setTextSettings(prev => ({...prev, ...setting}));
        }}
        userClickedToolbarItem={editMode => setEditMode(editMode)}
        userClickedAddToCart={async () => {
          const errMessage =
            'Failed to add to cart. Refresh the page & try again.';

          const productVariantId =
            productData?.productByHandle.variants.edges[productVariantIndex]
              .node.id || '';

          const customCardDataUrl = getCustomCardDataUrl(
            selectedObjName,
            setSelectedObjName,
            stageRef,
            backgroundRef
          );

          if (!customCardDataUrl || !checkoutData?.node.id) {
            return toast.error(errMessage);
          }

          setIsUploadingSvg(true);

          try {
            const svgUrl = await getCustomCardSvgUrl(
              paperSettings,
              customCardDataUrl
            );

            const googleClientId = await getGoogleClientId();

            setIsUploadingSvg(false);

            const productCustomAttributes = [
              {
                key: customAttributeFields.SVG_FILE,
                value: svgUrl,
              },
              {
                key: customAttributeFields.CUSTOM_CARD_DATA,
                value: JSON.stringify({
                  boxes,
                  circles,
                  straightLines,
                  texts,
                  lines,
                  images,
                }),
              },
              {
                key: customAttributeFields.CUSTOM_CARD_PAPER_SETTINGS,
                value: JSON.stringify(paperSettings),
              },
              {
                key: customAttributeFields.GOOGLE_CLIENT_ID,
                value: googleClientId,
              },
            ];

            if (isEditMode) {
              await updateCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData?.node.id,
                  lineItems: [
                    {
                      id: productLineItem?.node.id,
                      variantId: productVariantId,
                      quantity: parseInt(paperSettings.quantity),
                      customAttributes: productCustomAttributes,
                    },
                  ],
                },
              });
            } else {
              await addCheckoutLineItems({
                variables: {
                  checkoutId: checkoutData?.node.id,
                  lineItems: [
                    {
                      variantId: productVariantId,
                      quantity: parseInt(paperSettings.quantity),
                      customAttributes: productCustomAttributes,
                    },
                  ],
                },
              });
            }

            services.storage.deleteItem(customCardStorage.PERSISTENCE_DATA);
            services.storage.deleteItem(customCardStorage.PAPER_SETTINGS);
          } catch (error) {
            return toast.error(errMessage);
          }
        }}
        userClickedGetProof={async () => {
          const sampleIsOnLimitErrMessage =
            'You have reached your maximum of 5 samples.';

          const errMessage =
            'Failed to add to cart. Refresh the page & try again.';

          const variantId =
            sampleStationeryData?.productByHandle?.variants.edges[0].node.id ||
            '';

          if (sampleIsOnLimit) return toast.error(sampleIsOnLimitErrMessage);

          const customCardDataUrl = getCustomCardDataUrl(
            selectedObjName,
            setSelectedObjName,
            stageRef,
            backgroundRef
          );

          if (!customCardDataUrl || !checkoutData?.node.id)
            return toast.error(errMessage);

          setIsUploadingSvg(true);

          try {
            const svgUrl = await getCustomCardSvgUrl(
              paperSettings,
              customCardDataUrl
            );

            setIsUploadingSvg(false);

            const sampleStationeryCustomAttributes = [
              {key: customAttributeFields.SVG_FILE, value: svgUrl},
              {key: customAttributeFields.PARENT_PRODUCT_ID, value: itemId},
            ];

            await addCheckoutLineItems({
              variables: {
                checkoutId: checkoutData.node.id,
                lineItems: [
                  {
                    variantId,
                    quantity: 1,
                    customAttributes: sampleStationeryCustomAttributes,
                  },
                ],
              },
            });
          } catch (error) {
            return toast.error(errMessage);
          }
        }}
        userClickedReset={() => {
          resetStorageSettings();
          resetElements();
          resetSettings();
          setSelectedObjName('');
          setEditMode(EditModes.SELECT);
          stageRef.current?.clear();
        }}
        onContainerKeyUp={e => {
          const isDeleteKeyPressed =
            e.key === 'Delete' || e.key === 'Backspace';

          if (isDeleteKeyPressed && stageRef.current && !isTextAreaVisible) {
            // Finds the element by its name and destroys it
            const selectedElements = stageRef.current.find(
              `.${selectedObjName}`
            );

            selectedElements.forEach(element => element.destroy());
            services.storage.deleteItem(selectedObjName);

            // Need to add in array for each new element
            if (selectedObjName.includes(ElementNames.TEXT)) {
              setTexts(texts.filter(text => text.name !== selectedObjName));
            } else if (selectedObjName.includes(ElementNames.LINE)) {
              setLines(lines.filter(line => line.name !== selectedObjName));
            } else if (selectedObjName.includes(ElementNames.IMAGE)) {
              setImages(images.filter(image => image.name !== selectedObjName));
            } else if (selectedObjName.includes(ElementNames.CIRCLE)) {
              setCircles(
                circles.filter(circle => circle.name !== selectedObjName)
              );
            } else if (selectedObjName.includes(ElementNames.BOX)) {
              setBoxes(boxes.filter(box => box.name !== selectedObjName));
            } else if (selectedObjName.includes(ElementNames.STRAIGHT_LINE)) {
              setStraightLines(
                straightLines.filter(
                  straightLine => straightLine.name !== selectedObjName
                )
              );
            }
            // cleanup
            setSelectedObjName('');
          }
        }}
        onStageMouseDown={e => {
          const stageTarget = e.target.getStage();
          const clickedOnEmpty = e.target === stageTarget;

          if (clickedOnEmpty) {
            textAreaRef.current?.blur();
            setSelectedObjName('');
          }

          if (editMode === EditModes.PENCIL) {
            // Draws only if the mode is set to pencil
            isDrawing.current = true;

            const pos = stageTarget?.getPointerPosition();
            const name = `${ElementNames.LINE}${lines.length}`;

            setLines([
              ...lines,
              {name, tool: 'pen', points: [pos?.x || 0, pos?.y || 0]},
            ]);
          } else if (
            (editMode === EditModes.TEXT ||
              editMode === EditModes.BOX ||
              editMode === EditModes.CIRCLE) &&
            clickedOnEmpty
          ) {
            const start: {x: number; y: number} | undefined | null =
              stageTarget?.getPointerPosition();

            if (start) {
              handleStartAnnotation(start.x || 0, start.y || 0, editMode);
            }
          } else if (editMode === EditModes.LINE && clickedOnEmpty) {
            const start: {x: number; y: number} | undefined | null =
              stageTarget?.getPointerPosition();

            if (start) {
              setNewStraightLineAnnotation({
                x: start.x,
                y: start.y,
                nextX: 0,
                nextY: 0,
              });
            }
          }
        }}
        onStageMove={e => {
          // no drawing - skipping
          if (
            !isDrawing.current &&
            !newAnnotation &&
            !newStraightLineAnnotation
          ) {
            return;
          }

          const stage = e.target.getStage();
          const point = stage?.getPointerPosition();
          if (isDrawing.current) {
            const lastLine = lines[lines.length - 1];
            // add point
            lastLine.points = lastLine.points.concat([
              point?.x || 0,
              point?.y || 0,
            ]);

            // replace last
            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
          }

          if (newAnnotation) {
            const width = (point?.x || 0) - (newAnnotation?.x || 0);
            const height = (point?.y || 0) - (newAnnotation.y || 0);

            if (width <= 0 || height <= 0) {
              handleMoveAnnotation(0, 0);
              return;
            }

            handleMoveAnnotation(width, height);
          }

          if (newStraightLineAnnotation) {
            setNewStraightLineAnnotation(prev => {
              if (!prev) return null;
              return {
                ...prev,
                nextX: (point?.x || 0) - prev.x,
                nextY: (point?.y || 0) - prev.y,
              };
            });
          }
        }}
        onStageMouseUp={() => {
          isDrawing.current = false;
          // SQUARE
          if (newAnnotation && newAnnotation.height && newAnnotation.width) {
            if (editMode === EditModes.TEXT) {
              const name = `${ElementNames.TEXT}${texts.length + 1}`;
              setTexts(prev => [
                ...prev,
                {
                  name,
                  x: newAnnotation.x,
                  y: newAnnotation.y,
                  height: newAnnotation.height,
                  width: newAnnotation.width,
                },
              ]);
              setSelectedObjName(name);
            }
            if (editMode === EditModes.BOX) {
              const name = `${ElementNames.BOX}${boxes.length + 1}`;
              setBoxes(prev => [
                ...prev,
                {
                  name,
                  x: newAnnotation.x,
                  y: newAnnotation.y,
                  width: newAnnotation.width,
                  height: newAnnotation.height,
                },
              ]);
              setSelectedObjName(name);
            }
            if (editMode === EditModes.CIRCLE) {
              const name = `${ElementNames.CIRCLE}${circles.length + 1}`;
              const radiusX = newAnnotation.width / 2;
              const radiusY = newAnnotation.height / 2;
              setCircles(prev => [
                ...prev,
                {
                  name,
                  x: newAnnotation.x + radiusX,
                  y: newAnnotation.y + radiusY,
                  radiusX,
                  radiusY,
                },
              ]);
              setSelectedObjName(name);
            }
          }
          setNewAnnotation(null);

          if (
            editMode === EditModes.LINE &&
            newStraightLineAnnotation &&
            newStraightLineAnnotation.nextX &&
            newStraightLineAnnotation.nextY
          ) {
            const name = `${ElementNames.STRAIGHT_LINE}${
              straightLines.length + 1
            }`;
            setStraightLines(prev => [
              ...prev,
              {...newStraightLineAnnotation, name},
            ]);
            setSelectedObjName(name);
          }
          setNewStraightLineAnnotation(null);
        }}
        onTextAreaChange={e => setTextAreaValue(e.target.value)}
        onTextAreaBlur={e => {
          const selectedText = stageRef.current?.findOne(`.${selectedObjName}`);
          const konvaContainer = document.getElementById(
            'react-konva-div-container'
          );
          selectedText?.setAttr('text', e.target.value);
          setTexts(prevTexts =>
            prevTexts.map(text => {
              if (text.name === selectedObjName) {
                return {
                  ...text,
                  text: e.target.value,
                };
              }
              return text;
            })
          );
          setIsTextAreaVisible(false);
          selectedText?.show();
          konvaContainer?.focus();
        }}
      />
    );
  };
