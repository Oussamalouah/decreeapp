import React, {useEffect, useState} from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';

import {Font} from '../../styled';
import {getFormat} from '../../utils/get-font-format';
import {useProductByHandleData} from '../../utils/hooks/query-hooks';

/**
 * Utility component to load in custom fonts
 * queried from the fonts product in shopify
 *
 * @constructor
 */
export const GlobalStyle = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const {productData, loadingProductData} = useProductByHandleData('fonts');

  // Formats the product data into type Font once loadingProductData is done
  useEffect(() => {
    if (productData?.productByHandle) {
      const fontList = productData.productByHandle.description.split(',');

      const mappedFontList = fontList.map(font => {
        const fontInfo = font.split('|');
        const fontFamily = (fontInfo?.[0] || '').trim();
        const url = fontInfo?.[1] || '';
        const fontWeight = parseInt(fontInfo?.[2] || '400');
        const fontStyle = fontInfo?.[3] || '';

        return {
          fontFamily,
          url,
          format: getFormat(url),
          fontWeight,
          fontStyle,
        };
      });

      setFonts(mappedFontList);
    }
  }, [loadingProductData]);

  return (
    <ThemeProvider theme={{fonts}}>
      <FontStyles />
    </ThemeProvider>
  );
};

const FontStyles = createGlobalStyle`
  body {
    ${props => {
      return props.theme.fonts.map(font => {
        return `@font-face {
          font-family: '${font.fontFamily}';
          font-style: '${font.fontStyle}';
          font-weight: '${font.fontWeight}';
          src: url('${font.url}') format('${font.format}');
        }`;
      });
    }}
  }
`;
