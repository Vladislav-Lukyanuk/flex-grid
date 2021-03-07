import React, { FunctionComponentElement, ReactNode } from "react";
import { isArray } from "lodash-es";

import { generateMatrix, TMatrix } from "./utils";
import {
  ColStyled,
  TableDataFillHeightStyled,
  TableDataStyled,
  TableStyled,
} from "./flexGris.styles";

export type TArea = {
  startRow?: number;
  startColumn?: number;
  endRow?: number;
  endColumn?: number;
};

export type TFlexGridItem = TArea & {
  children: ReactNode;
};

export const FlexGridItem = ({ children }: TFlexGridItem) => (
  <div>{children}</div>
);

export type TFlexVerticalAlign = "center" | "top" | "bottom";

export type TChildren =
  | FunctionComponentElement<TFlexGridItem>
  | undefined
  | null;

export type TFlexGrid = {
  columns: number;
  verticalAlign: TFlexVerticalAlign;
  gridRowGap?: number;
  gridColumnGap?: number;
  children: TChildren[] | TChildren;
};

export const FlexGrid = ({
  columns,
  verticalAlign,
  gridRowGap = 0,
  gridColumnGap = 0,
  children,
}: TFlexGrid) => {
  const childrenArray = isArray(children) ? children : [children];

  const matrix = generateMatrix(columns, childrenArray);
  const realColumnsNumber = matrix[0].length;
  const rows = getTableRows(matrix, verticalAlign, childrenArray);
  const align = getTableCol(realColumnsNumber);

  return (
    <TableStyled gridRowGap={gridRowGap} gridColumnGap={gridColumnGap}>
      <colgroup>{align}</colgroup>
      <tbody>{rows}</tbody>
    </TableStyled>
  );
};

/**
 * Generates the table rows.
 * @param {TMatrix[][]} matrix - Generated grid matrix.
 * @param {TFlexVerticalAlign} verticalAlign - verticalAlign for each cell.
 * @param {TChildren[]} children - The grid elements.
 * @return {JSX.Element[]} - Return table rows.
 */
function getTableRows(
  matrix: TMatrix[][],
  verticalAlign: TFlexVerticalAlign,
  children: TChildren[]
): JSX.Element[] {
  const rows = [];

  for (let row = 0; row < matrix.length; row++) {
    const rowItems: JSX.Element[] = [];
    for (let column = 0; column < matrix[0].length; column++) {
      const item = matrix[row][column];
      if (item) {
        rowItems.push(
          <TableDataStyled
            rowSpan={item.rows}
            colSpan={item.columns}
            verticalAlign={verticalAlign}
          >
            {children[item.itemIndex]}
          </TableDataStyled>
        );
      } else if (item === undefined) {
        rowItems.push(
          <TableDataFillHeightStyled>
            <div />
          </TableDataFillHeightStyled>
        );
      }
    }
    rows.push(<tr>{rowItems}</tr>);
  }

  return rows;
}

/**
 * Generates the table col.
 * @param {number} columnsNumber - The number of grid columns.
 * @return {JSX.Element[]} - Return table cl.
 */
function getTableCol(columnsNumber: number): JSX.Element[] {
  const align: JSX.Element[] = [];
  const widthOfColumn = 100 / columnsNumber;

  Array(columnsNumber)
    .fill(0)
    .forEach(() => {
      align.push(<ColStyled width={widthOfColumn} />);
    });

  return align;
}
