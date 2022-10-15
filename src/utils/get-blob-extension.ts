export type BlobType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'text/csv';

/**
 * Gets the extension based on the blob type
 * @param type
 */
export const getBlobExtension = (type: BlobType) => {
  if (type === 'text/csv') {
    return '.csv';
  } else if (type === 'image/jpeg') {
    return '.jpg';
  } else if (type === 'image/png') {
    return '.png';
  } else {
    return '.svg';
  }
};
