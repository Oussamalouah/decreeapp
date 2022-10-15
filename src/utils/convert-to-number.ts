/**
 * Removes all non-numerical characters and returns a number
 *
 * @param s {string}
 *
 * @return {number}
 */
export const convertToNumber = (s: string) => {
  try {
    return parseInt(s.replace(/^\D+/g, ''));
  } catch (e) {
    return 0;
  }
};
