import { FunctionComponentElement, ReactNode } from "react";
export declare type TArea = {
    startRow?: number;
    startColumn?: number;
    endRow?: number;
    endColumn?: number;
};
export declare type TFlexGridItem = TArea & {
    children: ReactNode;
};
export declare const FlexGridItem: ({ children }: TFlexGridItem) => JSX.Element;
export declare type TFlexVerticalAlign = "center" | "top" | "bottom";
export declare type TChildren = FunctionComponentElement<TFlexGridItem> | undefined | null;
export declare type TFlexGrid = {
    columns: number;
    verticalAlign: TFlexVerticalAlign;
    gridRowGap?: number;
    gridColumnGap?: number;
    children: TChildren[] | TChildren;
};
export declare const FlexGrid: ({ columns, verticalAlign, gridRowGap, gridColumnGap, children, }: TFlexGrid) => JSX.Element;
