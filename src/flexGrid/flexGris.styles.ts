import styled from "styled-components";

import { TFlexVerticalAlign } from "./FlexGrid";

type TTableStyled = {
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
