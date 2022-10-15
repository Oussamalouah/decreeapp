import React, {useEffect, useState} from 'react';
import {Category, QueryProps} from './StoreScreenContainer';
import {useQuery} from '@apollo/client';
import {
  PACKAGES_QUERY,
  PRODUCTS_QUERY,
} from '../../../api/operations/queries/store';
import {getPaperColors} from './helpers/get-paper-colors';
import {getProductTags} from './helpers/get-product-tags';
import {StationeryTypes} from '../../../utils/constants/stationery-type.constants';
import {useSearchParams} from '../../../utils/hooks/use-search-params';
import {printedTypes} from '../../../utils/constants/store.contants';
import {useParams} from 'react-router-dom';

type Props = {
  selectedProductType: string;
  selectedProductTypeText: string;
  currentStationeryType: StationeryTypes | undefined;
  userClickedMenuItem: (
    productId: string,
    filters?: {tagIds?: string; paperColors?: string; sortType?: string}
  ) => void;
  closeMenu: () => void;
  // For mobile to deselect current product
  userClickedBack?: () => void;
};

export type FilterMenuProps = {
  tags: Category[];
  colors: Category[];
  selectedStyles: Category[];
  selectedPaperColors: Category[];
  loading: boolean;
  isPackage: boolean;
  isSaveDisabled: boolean;
  selectedProductType: string;
  selectedProductTypeText: string;

  userClickedStyleFilter: (filter: Category) => void;
  userClickedPaperColorFilter: (filter: Category) => void;
  userClickedSave: () => void;
  userClickedCancel: () => void;
  userClickedClear: () => void;
  userClickedLetterPress: () => void;
  userClickedEngraved: () => void;
  userClickedMenuItem: (
    productId: string,
    filters?: {tagIds?: string; paperColors?: string; sortType?: string}
  ) => void;
  userClickedBack: () => void;
};

const userClickedFilter = (
  filter: Category,
  selectedFilters: Category[],
  setSelectedFilter: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  const hasFilter = selectedFilters.some(
    selectedStyle => selectedStyle.id === filter.id
  );

  if (hasFilter) {
    setSelectedFilter(prevFilters => {
      return prevFilters.filter(
        selectedStyle => selectedStyle.id !== filter.id
      );
    });
  } else {
    setSelectedFilter([...selectedFilters, filter]);
  }
};

export const FilterMenuContainer =
  (Screen: React.FC<FilterMenuProps>) => (props: Props) => {
    const [selectedStyles, setSelectedStyles] = useState<Category[]>([]);
    const [selectedPaperColors, setSelectedPaperColors] = useState<Category[]>(
      []
    );

    const searchParams = useSearchParams();
    const {productId: productTypeId} = useParams<{productId: string}>();

    const isPackage = props.selectedProductType === 'packages';
    const isSaveDisabled =
      [...selectedPaperColors, ...selectedStyles].length <= 0;

    const {loading, data} = useQuery<QueryProps>(
      isPackage ? PACKAGES_QUERY : PRODUCTS_QUERY,
      {
        variables: {query: `${`product_type:${props.selectedProductType}`}`},
        fetchPolicy: 'cache-and-network',
      }
    );

    const tags = getProductTags(
      props.currentStationeryType,
      props.selectedProductType
    );
    const paperColors = getPaperColors(isPackage, data);

    const resetStates = () => {
      setSelectedStyles([]);
      setSelectedPaperColors([]);
    };

    useEffect(() => {
      if (props.selectedProductType === productTypeId) {
        const searchTags = searchParams.get('tagIds')?.split('|') || [];
        const searchColors = searchParams.get('paperColors')?.split('|') || [];

        const initialStyles = tags.filter(tag =>
          searchTags.some(searchTag => searchTag === tag.id)
        );
        const initialColors = paperColors.filter(color =>
          searchColors.some(searchColor => searchColor === color.text)
        );

        setSelectedStyles(initialStyles);
        setSelectedPaperColors(initialColors);
      } else {
        resetStates();
      }
    }, [props.selectedProductType]);

    return (
      <Screen
        tags={tags}
        loading={loading}
        isPackage={isPackage}
        colors={paperColors}
        isSaveDisabled={isSaveDisabled}
        selectedStyles={selectedStyles}
        selectedPaperColors={selectedPaperColors}
        selectedProductType={props.selectedProductType}
        selectedProductTypeText={props.selectedProductTypeText}
        userClickedMenuItem={props.userClickedMenuItem}
        userClickedSave={() => {
          // Removes styles not present in the selected product type
          // So we can persist the changes
          const filteredStyled = selectedStyles.filter(style =>
            tags.some(tag => tag.id === style.id)
          );
          const filteredPaperColors = selectedPaperColors.filter(color =>
            paperColors.some(paperColor => paperColor.id === color.id)
          );

          // Combine these since printed types are still tags
          const tagIds = [...filteredStyled].map(e => e.id).join('|');

          // Used .text vs .id theres issues if # is present in the url
          const paperColorIds = filteredPaperColors.map(e => e.text).join('|');

          props.userClickedMenuItem(props.selectedProductType, {
            tagIds,
            paperColors: paperColorIds,
          });
        }}
        userClickedLetterPress={() => {
          props.userClickedMenuItem(props.selectedProductType, {
            tagIds: printedTypes.letterPress,
          });
        }}
        userClickedEngraved={() => {
          props.userClickedMenuItem(props.selectedProductType, {
            sortType: printedTypes.engraved,
          });
        }}
        userClickedCancel={() => {
          resetStates();
          props.closeMenu();
        }}
        userClickedClear={resetStates}
        userClickedBack={() => props.userClickedBack?.()}
        userClickedStyleFilter={filter =>
          userClickedFilter(filter, selectedStyles, setSelectedStyles)
        }
        userClickedPaperColorFilter={filter =>
          userClickedFilter(filter, selectedPaperColors, setSelectedPaperColors)
        }
      />
    );
  };
