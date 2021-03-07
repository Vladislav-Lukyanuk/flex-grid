import styled, { css } from "styled-components";

import { TFlexVerticalAlign } from "./FlexGrid";

type TTableStyled = {
  showGrid?: boolean;
  gridRowGap: number;
  gridColumnGap: number;
};

export const TableStyled = styled.table<TTableStyled>`
  height: 100%;
  width: ${({ gridColumnGap }) => `calc(100% + ${gridColumnGap * 2}px)`};
  margin-left: ${({ gridColumnGap }) => `-${gridColumnGap}px`};
  margin-top: ${({ gridRowGap }) => `-${gridRowGap}px`};

  border-spacing: ${({ gridColumnGap, gridRowGap }) =>
    `${gridColumnGap}px ${gridRowGap}px`};

  ${({ showGrid }) =>
    showGrid &&
    css`
      td {
        border: 1px solid black;
      }
    `}
`;

type TColStyled = {
  width: number;
};

export const ColStyled = styled.col<TColStyled>`
  width: ${({ width }) => `${width}%`};
`;

export const TableDataFillHeightStyled = styled.td`
  height: 100%;
`;

type TTableDataStyled = {
  verticalAlign: TFlexVerticalAlign;
};

export const TableDataStyled = styled.td<TTableDataStyled>`
  vertical-align: ${({ verticalAlign }) => verticalAlign};
`;

type TTableItemWrapperStyled = {
  height?: number;
};

export const TableItemWrapperStyled = styled.div<TTableItemWrapperStyled>`
  overflow: auto;
  ${({ height }) => css`
    height: ${height}px;
  `}
`;
