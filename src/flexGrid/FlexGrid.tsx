import React, { FunctionComponentElement } from "react";
import { isArray } from "lodash-es";

import { TFlexGridItem } from "./FlexGridItem";
import { TableStyled } from "./flexGris.styles";

import { generateMatrix } from "./utils";
import { getTableCol, getTableRows } from "./drawUtilities";

import { TFlexAlign, TFlexJustify } from "./types";

type TChildren = FunctionComponentElement<TFlexGridItem> | undefined | null;

type TFlexGrid = {
  showGrid?: boolean;
  cellHeight?: number;
  columns: number;
  columnsWidthInPercent?: number[];
  cellAlign?: TFlexAlign;
  cellJustify?: TFlexJustify;
  gridRowGap?: number;
  gridColumnGap?: number;
  children: TChildren[] | TChildren;
};

export const FlexGrid = ({
  showGrid,
  cellHeight,
  columns,
  columnsWidthInPercent,
  cellAlign = "unset",
  cellJustify = "unset",
  gridRowGap = 0,
  gridColumnGap = 0,
  children,
}: TFlexGrid) => {
  const childrenArray = isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter((child) =>
    Boolean(child)
  ) as FunctionComponentElement<TFlexGridItem>[];

  const matrix = generateMatrix(columns, filteredChildren);
  const realColumnsNumber = matrix[0].length;
  const rows = getTableRows(
    matrix,
    filteredChildren,
    gridRowGap,
    cellAlign,
    cellJustify,
    cellHeight
  );
  const align = getTableCol(realColumnsNumber, columnsWidthInPercent);

  return (
    <TableStyled
      showGrid={showGrid}
      gridRowGap={gridRowGap}
      gridColumnGap={gridColumnGap}
    >
      <colgroup>{align}</colgroup>
      <tbody>{rows}</tbody>
    </TableStyled>
  );
};
