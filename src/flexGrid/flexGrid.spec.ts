import React from "react";

import { FlexGridItem, TFlexGridItem } from "./FlexGrid";
import { generateMatrix } from "./utils";

describe("generateMatrix", () => {
  it("returns matrix fill by children indexes", () => {
    const children = [
      React.createElement<TFlexGridItem>(FlexGridItem, {
        startRow: 1,
        startColumn: 1,
        endRow: 4,
        endColumn: 2,
        children: "0",
      }),
      React.createElement<TFlexGridItem>(FlexGridItem, {
        startRow: 3,
        startColumn: 4,
        endRow: 5,
        endColumn: 5,
        children: "1",
      }),
      React.createElement<TFlexGridItem>(FlexGridItem, {
        children: "2",
      }),
      React.createElement<TFlexGridItem>(FlexGridItem, {
        children: "3",
      }),
      React.createElement<TFlexGridItem>(FlexGridItem, {
        children: "4",
      }),
    ];

    const matrix = generateMatrix(3, children);

    expect(matrix.length).toEqual(5);
    expect(matrix[0].length).toEqual(5);

    expect(matrix[0][0]?.itemIndex).toEqual(0);
    expect(matrix[0][1]).toEqual(null);
    expect(matrix[1][0]).toEqual(null);

    expect(matrix[2][3]?.itemIndex).toEqual(1);
    expect(matrix[2][4]).toEqual(null);
    expect(matrix[3][3]).toEqual(null);

    expect(matrix[0][2]?.itemIndex).toEqual(2);

    expect(matrix[0][3]?.itemIndex).toEqual(3);

    expect(matrix[0][4]?.itemIndex).toEqual(4);
  });
});
