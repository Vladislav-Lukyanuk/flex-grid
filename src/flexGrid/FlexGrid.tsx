import React, { FunctionComponentElement, ReactNode } from "react";
import { cloneDeep, isArray, isNil } from "lodash-es";

import {
  ColStyled,
  EmptyBlockStyled,
  TableDataFillHeightStyled,
  TableItemWrapperStyled,
  TableStyled,
} from "./flexGris.styles";
import { generateMatrix, hasArea, TMatrix } from "./utils";

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

type TFlexCommon = "inherit" | "initial" | "unset";

export type TFlexJustify =
  | TFlexCommon
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "left"
  | "right"
  | "baseline"
  | "first baseline"
  | "last baseline"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "safe center"
  | "unsafe center";

export type TFlexAlign =
  | TFlexCommon
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export type TChildren =
  | FunctionComponentElement<TFlexGridItem>
  | undefined
  | null;

export type TFlexGrid = {
  showGrid?: boolean;
  cellHeight?: number;
  columns: number;
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
  const childrenWithHeight = fillHeight(
    filteredChildren,
    gridRowGap,
    cellHeight
  );
  const adjustedChildren = fillVerticalAndHorizontalAlign(
    childrenWithHeight,
    cellAlign,
    cellJustify
  );

  const matrix = generateMatrix(columns, adjustedChildren);
  const realColumnsNumber = matrix[0].length;
  const rows = getTableRows(matrix, adjustedChildren, cellHeight);
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
 * @param {number | undefined} rowGap.
 * @param {number | undefined} height.
 * @return {JSX.Element[]} - Returns grid elements with height.
 */
function fillHeight(
  children: FunctionComponentElement<TFlexGridItem>[],
  rowGap: number = 0,
  height?: number
): JSX.Element[] {
  if (isNil(height)) {
    return children;
  }

  const clonedArray = cloneDeep(children);

  clonedArray.forEach((child) => {
    if (
      hasArea(
        child.props.startRow,
        child.props.startColumn,
        child.props.endRow,
        child.props.endColumn
      )
    ) {
      child.props.height =
        ((child.props.endRow as number) -
          (child.props.startRow as number) +
          1) *
          height +
        ((child.props.endRow as number) - (child.props.startRow as number)) *
          rowGap;

      return;
    }

    child.props.height = height;
  });

  return clonedArray;
}

/**
 * Set align and justify for each cell.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children
 * @param align
 * @param justify
 * @return {JSX.Element[]} - Returns grid elements with  align and justify.
 */
function fillVerticalAndHorizontalAlign(
  children: FunctionComponentElement<TFlexGridItem>[],
  align: TFlexAlign,
  justify: TFlexJustify
): JSX.Element[] {
  const clonedArray = cloneDeep(children);

  clonedArray.forEach((child) => {
    child.props.align = align;
    child.props.justify = justify;
  });

  return clonedArray;
}

/**
 * Generates the table rows.
 * @param {TMatrix[][]} matrix - Generated grid matrix.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children - The grid elements.
 * @param {number | undefined} cellHeight
 * @return {JSX.Element[]} - Returns table rows.
 */
function getTableRows(
  matrix: TMatrix[][],
  children: FunctionComponentElement<TFlexGridItem>[],
  cellHeight?: number
): JSX.Element[] {
  const rows = [];

  for (let row = 0; row < matrix.length; row++) {
    const rowItems: JSX.Element[] = [];
    for (let column = 0; column < matrix[0].length; column++) {
      const item = matrix[row][column];
      if (item) {
        rowItems.push(
          <td
            key={`element_${row}_${column}`}
            rowSpan={item.rows}
            colSpan={item.columns}
          >
            {children[item.itemIndex]}
          </td>
        );
      } else if (item === undefined) {
        rowItems.push(
          <TableDataFillHeightStyled key={`empty_cell_${row}_${column}`}>
            <EmptyBlockStyled height={cellHeight} />
          </TableDataFillHeightStyled>
        );
      }
    }
    rows.push(<tr key={`row_${row}`}>{rowItems}</tr>);
  }

  return rows;
}

/**
 * Generates the table col.
 * @param {number} columnsNumber - The number of grid columns.
 * @return {JSX.Element[]} - Returns table cl.
 */
function getTableCol(columnsNumber: number): JSX.Element[] {
  const align: JSX.Element[] = [];
  const widthOfColumn = 100 / columnsNumber;

  Array(columnsNumber)
    .fill(0)
    .forEach((value, index) => {
      align.push(<ColStyled key={`col_${index}`} width={widthOfColumn} />);
    });

  return align;
}
