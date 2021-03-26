import React, { FunctionComponentElement, ReactNode } from 'react';
import { isArray, isNil } from 'lodash-es';

import {
  ColStyled,
  EmptyBlockStyled,
  TableDataFillHeightStyled,
  TableItemWrapperStyled,
  TableStyled,
} from './flexGris.styles';
import { generateMatrix, hasArea, TMatrix } from './utils';

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

export const FlexGridItem = ({ height, align, justify, children }: TFlexGridItem) => (
  <TableItemWrapperStyled height={height} align={align} justify={justify}>
    {children}
  </TableItemWrapperStyled>
);

type TFlexCommon = 'inherit' | 'initial' | 'unset';

export type TFlexJustify =
  | TFlexCommon
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center';

export type TFlexAlign =
  | TFlexCommon
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

export type TChildren = FunctionComponentElement<TFlexGridItem> | undefined | null;

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
  cellAlign = 'unset',
  cellJustify = 'unset',
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
  const align = getTableCol(realColumnsNumber);

  return (
    <TableStyled showGrid={showGrid} gridRowGap={gridRowGap} gridColumnGap={gridColumnGap}>
      <colgroup>{align}</colgroup>
      <tbody>{rows}</tbody>
    </TableStyled>
  );
};

/**
 * Generates the table rows.
 * @param {TMatrix[][]} matrix - Generated grid matrix.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children - The grid elements.
 * @param {number} gridRowGap
 * @param {TFlexAlign} cellAlign
 * @param {TFlexJustify} cellJustify
 * @param {number | undefined} cellHeight
 * @return {JSX.Element[]} - Returns table rows.
 */
function getTableRows(
  matrix: TMatrix[][],
  children: FunctionComponentElement<TFlexGridItem>[],
  gridRowGap: number,
  cellAlign: TFlexAlign,
  cellJustify: TFlexJustify,
  cellHeight?: number
): JSX.Element[] {
  const rows = [];

  for (let row = 0; row < matrix.length; row++) {
    const rowItems: JSX.Element[] = [];
    for (let column = 0; column < matrix[0].length; column++) {
      const item = matrix[row][column];
      if (item) {
        const child = children[item.itemIndex];
        const props: {
          height?: number;
          align: TFlexAlign;
          justify: TFlexJustify;
        } = {
          align: cellAlign,
          justify: cellJustify,
        };

        if (
          !isNil(cellHeight) &&
          hasArea(
            child.props.startRow,
            child.props.startColumn,
            child.props.endRow,
            child.props.endColumn
          )
        ) {
          props.height =
            ((child.props.endRow as number) - (child.props.startRow as number) + 1) * cellHeight +
            ((child.props.endRow as number) - (child.props.startRow as number)) * gridRowGap;
        }

        const clonedChild = React.cloneElement(child, props);

        rowItems.push(
          <td key={`element_${row}_${column}`} rowSpan={item.rows} colSpan={item.columns}>
            {clonedChild}
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
