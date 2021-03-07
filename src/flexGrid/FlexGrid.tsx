import React, { FunctionComponentElement, ReactNode } from "react";
import { cloneDeep, isArray, isNil } from "lodash-es";

import { generateMatrix, TMatrix } from "./utils";
import {
  ColStyled,
  TableDataFillHeightStyled,
  TableDataStyled,
  TableItemWrapperStyled,
  TableStyled,
} from "./flexGris.styles";

export type TArea = {
  startRow?: number;
  startColumn?: number;
  endRow?: number;
  endColumn?: number;
};

export type TFlexGridItem = TArea & {
  height?: number;
  children: ReactNode;
};

export const FlexGridItem = ({ height, children }: TFlexGridItem) => (
  <TableItemWrapperStyled height={height}>{children}</TableItemWrapperStyled>
);

export type TFlexVerticalAlign = "center" | "top" | "bottom";

export type TChildren =
  | FunctionComponentElement<TFlexGridItem>
  | undefined
  | null;

export type TFlexGrid = {
  showGrid?: boolean;
  cellHeight?: number;
  columns: number;
  verticalAlign: TFlexVerticalAlign;
  gridRowGap?: number;
  gridColumnGap?: number;
  children: TChildren[] | TChildren;
};

export const FlexGrid = ({
  showGrid,
  cellHeight,
  columns,
  verticalAlign,
  gridRowGap = 0,
  gridColumnGap = 0,
  children,
}: TFlexGrid) => {
  const childrenArray = isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter((child) =>
    Boolean(child)
  ) as FunctionComponentElement<TFlexGridItem>[];

  const childrenWithHeight = fillHeight(filteredChildren, cellHeight);

  const matrix = generateMatrix(columns, childrenWithHeight);
  const realColumnsNumber = matrix[0].length;
  const rows = getTableRows(
    matrix,
    verticalAlign,
    childrenWithHeight,
    cellHeight
  );
  const align = getTableCol(realColumnsNumber);

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

/**
 * Set height for each cell.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children
 * @param {number | undefined} height.
 * @return {JSX.Element[]} - Return grid elements with height.
 */
function fillHeight(
  children: FunctionComponentElement<TFlexGridItem>[],
  height?: number
): JSX.Element[] {
  if (isNil(height)) {
    return children;
  }

  const clonedArray = cloneDeep(children);

  clonedArray.forEach((child) => {
    if (
      child.props.startRow !== undefined ||
      child.props.startColumn !== undefined ||
      child.props.endRow !== undefined ||
      child.props.endColumn !== undefined
    ) {
      return;
    }

    child.props.height = height;
  });

  return clonedArray;
}

/**
 * Generates the table rows.
 * @param {TMatrix[][]} matrix - Generated grid matrix.
 * @param {TFlexVerticalAlign} verticalAlign - verticalAlign for each cell.
 * @param {TChildren[]} children - The grid elements.
 * @param {number | undefined} cellHeight
 * @return {JSX.Element[]} - Return table rows.
 */
function getTableRows(
  matrix: TMatrix[][],
  verticalAlign: TFlexVerticalAlign,
  children: TChildren[],
  cellHeight?: number
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
            <div style={{ height: cellHeight }} />
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
