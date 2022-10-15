/**
 * Gets the font format based on the url
 *
 * @param url
 *
 * @return string
 */
export const getFormat = (url: string) => {
  if (url.includes('.otf')) {
    return 'opentype';
  } else if (url.includes('.ttf')) {
    return 'truetype';
  } else if (url.includes('.woff2')) {
    return 'woff2';
  } else if (url.includes('.woff')) {
    return 'woff';
  } else {
    return '';
  }
};
