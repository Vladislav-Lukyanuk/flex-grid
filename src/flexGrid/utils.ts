import { FunctionComponentElement } from "react";
import { isNil } from "lodash-es";

import { TFlexGridItem } from "./FlexGridItem";

export type TMatrix =
  | {
      rows: number;
      columns: number;
      itemIndex: number;
    }
  | null
  | undefined;

/**
 * Generates a grid matrix.
 * @param {number} initialColumns - The number of grid columns.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children - A grid items.
 * @return {TMatrix[][]} - Returns a grid matrix using for draw an a grid.
 */
function generateMatrix(
  initialColumns: number,
  children: FunctionComponentElement<TFlexGridItem>[]
): TMatrix[][] {
  const [rows, columns] = getArrayDimensional(children, initialColumns);

  return fillMatrix(children, rows, columns);
}

/**
 * Fill a grid matrix with grid items.
 * @param {FunctionComponentElement<TFlexGridItem>[]} children - A grid items.
 * @param {number} rows - The number of grid rows.
 * @param {number} columns - The number of grid columns.
 * @return {TMatrix[][]} - Returns a grid matrix using for draw an a grid.
 */
function fillMatrix(
  children: FunctionComponentElement<TFlexGridItem>[],
  rows: number,
  columns: number
): TMatrix[][] {
  const matrix = createTwoDimensionalArray<TMatrix>(rows, columns);

  children.forEach(
    ({ props: { startRow, startColumn, endRow, endColumn } }, childIndex) => {
      const useArea = hasArea(startRow, startColumn, endRow, endColumn);

      if (useArea) {
        const sR = startRow as number;
        const eR = endRow as number;
        const sC = startColumn as number;
        const eC = endColumn as number;

        const firstRowIndex = sR - 1;
        const firstColumnIndex = sC - 1;

        if (matrix[firstRowIndex][firstColumnIndex] !== undefined) {
          return;
        }

        for (let i = firstRowIndex; i < eR; i++) {
          for (let j = firstColumnIndex; j < eC; j++) {
            if (i === firstRowIndex && j === firstColumnIndex) {
              matrix[i][j] = {
                rows: eR - sR + 1,
                columns: eC - sC + 1,
                itemIndex: childIndex,
              };

              continue;
            }
            matrix[i][j] = null;
          }
        }

        return;
      }

      const [rowIndex, columnIndex] = getEmptyCell(matrix);

      matrix[rowIndex][columnIndex] = {
        rows: 1,
        columns: 1,
        itemIndex: childIndex,
      };
    }
  );

  return matrix;
}

/**
 * Calculate the array dimensional.
 * @param array - A grid items.
 * @param initialColumns - An initial grid columns
 * @return {[number, number]} - Returns a grid row and column numbers.
 */
function getArrayDimensional(
  array: FunctionComponentElement<TFlexGridItem>[],
  initialColumns: number
): [number, number] {
  const { volume, maxColumn, maxRow } = array.reduce(
    (prev, { props: { startRow, startColumn, endRow, endColumn } }) => {
      const areaVolume = hasArea(startRow, startColumn, endRow, endColumn)
        ? ((endRow as number) - (startRow as number) + 1) *
          ((endColumn as number) - (startColumn as number) + 1)
        : 1;
      const currentMatrixVolume = areaVolume + prev.volume;

      return {
        volume: currentMatrixVolume,
        maxColumn: Math.max(prev.maxColumn, endColumn || 0),
        maxRow: Math.max(prev.maxRow, endRow || 0),
      };
    },
    {
      volume: 0,
      maxColumn: initialColumns,
      maxRow: 1,
    }
  );
  const rows = Math.max(Math.ceil(volume / maxColumn), maxRow);

  return [rows, maxColumn];
}

/**
 * Check is grid item has an area properties.
 * @param startRow - A start row position.
 * @param startColumn - A start column position.
 * @param endRow - An end row position.
 * @param endColumn - An end column position.
 * @return {boolean} - Returns boolean flag.
 */
function hasArea(
  startRow?: number,
  startColumn?: number,
  endRow?: number,
  endColumn?: number
): boolean {
  return !(
    isNil(startRow) ||
    isNil(startColumn) ||
    isNil(endRow) ||
    isNil(endColumn)
  );
}

/**
 * Get empty cell indexes from a grid matrix.
 * @param matrix - A grid matrix.
 * @return {[number, number]} - Returns empty cell indexes.
 */
function getEmptyCell<T>(matrix: T[][]): [number, number] {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === undefined) {
        return [i, j];
      }
    }
  }

  return [0, 0];
}

/**
 * Create matrix suing row and column numbers.
 * @param rows - The number of grid rows.
 * @param columns - The number of grid columns.
 * @return {[number, number]} - Returns empty two dimensional array.
 */
function createTwoDimensionalArray<T>(rows: number, columns: number): T[][] {
  const arr = new Array(rows);

  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns).fill(undefined);
  }

  return arr;
}

export { generateMatrix, hasArea };
