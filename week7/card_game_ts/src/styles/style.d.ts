import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      lightPink: string;
      darkPink: string;
      lightPurple: string;
      purple: string;
      greyPurple: string;
      lightYellow: string;
    };
  }
}
