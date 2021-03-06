import styled, { css } from "styled-components";

import { TFlexAlign, TFlexJustify } from "./types";

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

type TTableItemWrapperStyled = {
  height?: number;
  justify?: TFlexJustify;
  align?: TFlexAlign;
};

export const TableItemWrapperStyled = styled.div<TTableItemWrapperStyled>`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};

  height: ${({ height }) => (height ? `${height}px` : "100%")};

  ${({ height }) =>
    height &&
    css`
      overflow: auto;
    `}
`;

type TEmptyBlockStyled = {
  height?: number;
};

export const EmptyBlockStyled = styled.div<TEmptyBlockStyled>`
  height: ${({ height }) => `${height}px`};
`;
