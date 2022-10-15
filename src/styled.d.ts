import 'styled-components';

export type Font = {
  url: string;
  format: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: Font[];
  }
}
