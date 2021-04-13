import React, { FunctionComponentElement } from "react";
import { isNil } from "lodash-es";

import {
  ColStyled,
  EmptyBlockStyled,
  TableDataFillHeightStyled,
} from "./flexGris.styles";
import { TFlexGridItem } from "./FlexGridItem";
import { hasArea, TMatrix } from "./utils";
import { TFlexAlign, TFlexJustify } from "./types";

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

        if (!isNil(cellHeight)) {
          props.height = cellHeight;
        }

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
            ((child.props.endRow as number) -
              (child.props.startRow as number) +
              1) *
              cellHeight +
            ((child.props.endRow as number) -
              (child.props.startRow as number)) *
              gridRowGap;
        }

        const clonedChild = React.cloneElement(child, props);

        rowItems.push(
          <td
            key={`element_${row}_${column}`}
            rowSpan={item.rows}
            colSpan={item.columns}
          >
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
 * @param {number[] | undefined } columnsWidth - Width of each column.
 * @return {JSX.Element[]} - Returns table cl.
 */
function getTableCol(
  columnsNumber: number,
  columnsWidth?: number[]
): JSX.Element[] {
  const align: JSX.Element[] = [];
  const widthOfColumn = 100 / columnsNumber;

  let totalWidth = 0;
  let numberOfUndefined = 0;
  let localColumnsWidth: (number | undefined)[] | null = null;

  if (columnsWidth) {
    localColumnsWidth = [...columnsWidth];
    localColumnsWidth.length = columnsNumber;

    for (let index = 0; index < localColumnsWidth.length; index++) {
      const columnWidth = localColumnsWidth[index];

      if (
        columnWidth === undefined ||
        columnWidth < 0 ||
        totalWidth + columnWidth > 100
      ) {
        localColumnsWidth[index] = undefined;
        numberOfUndefined++;
        continue;
      }

      totalWidth += columnWidth;
    }
  }

  Array(columnsNumber)
    .fill(0)
    .forEach((value, index) => {
      let width = widthOfColumn;

      if (localColumnsWidth) {
        const columnWidth = localColumnsWidth[index];

        width =
          columnWidth === undefined
            ? (100 - totalWidth) / numberOfUndefined
            : columnWidth;
      }

      align.push(<ColStyled key={`col_${index}`} width={width} />);
    });

  return align;
}

export { getTableRows, getTableCol };
