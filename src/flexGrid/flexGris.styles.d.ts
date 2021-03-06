import { TFlexVerticalAlign } from "./FlexGrid";
declare type TTableStyled = {
    gridRowGap: number;
    gridColumnGap: number;
};
export declare const TableStyled: import("styled-components").StyledComponent<"table", any, TTableStyled, never>;
declare type TColStyled = {
    width: number;
};
export declare const ColStyled: import("styled-components").StyledComponent<"col", any, TColStyled, never>;
export declare const TableDataFillHeightStyled: import("styled-components").StyledComponent<"td", any, {}, never>;
declare type TTableDataStyled = {
    verticalAlign: TFlexVerticalAlign;
};
export declare const TableDataStyled: import("styled-components").StyledComponent<"td", any, TTableDataStyled, never>;
export {};
