/**
 * Checks if route provided is valid
 *
 * @param route
 * @param validRoutes
 * @returns {boolean}
 */
export const isRouteValid = (route: string, validRoutes: string[]) =>
  route && validRoutes.some(validRoute => validRoute === route);
