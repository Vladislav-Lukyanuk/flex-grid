import React, { ReactNode } from "react";

import { TableItemWrapperStyled } from "./flexGris.styles";
import { TFlexAlign, TFlexJustify } from "./types";

export type TArea = {
  startRow?: number;
  startColumn?: number;
  endRow?: number;
  endColumn?: number;
};

export type TFlexGridItem = TArea & {
  height?: number;
  align?: TFlexAlign;
  justify?: TFlexJustify;
  children: ReactNode;
};

export const FlexGridItem = ({
  height,
  align,
  justify,
  children,
}: TFlexGridItem) => (
  <TableItemWrapperStyled height={height} align={align} justify={justify}>
    {children}
  </TableItemWrapperStyled>
);
