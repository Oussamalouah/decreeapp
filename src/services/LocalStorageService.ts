export type LocalStorageService = {
  /**
   * Stores a `value` using the given `key` in storage.
   */
  storeItem: (key: string, value: string) => void;

  /**
   * Retrieves the value with the given `key` in storage, or `null` if
   * there is no value.
   */
  getItem: (key: string) => string | null;

  /**
   * Deletes the value at the given `key` in storage.
   */
  deleteItem: (key: string) => void;

  /**
   * Clear LocalStorage
   */
  clear: () => void;
};

export const decreeKeys = {
  CHECKOUT_ID: 'chkcoutid',
};

export const localStorageService: LocalStorageService = {
  storeItem: (key, value) => localStorage.setItem(key, value),
  getItem: key => localStorage.getItem(key),
  deleteItem: key => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
