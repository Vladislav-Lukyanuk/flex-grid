import { TChildren } from './FlexGrid';
export declare type TMatrix = {
    rows: number;
    columns: number;
    itemIndex: number;
} | null | undefined;
declare function generateMatrix(initialColumns: number, children: TChildren[]): TMatrix[][];
export { generateMatrix };
