export interface ISheetCol {
  name: string;
  key: number;
}

export interface ISheetData {
  sheetData: string[][];
  sheetCols: ISheetCol[];
}

export type ISheetJSON = Record<string, ISheetData>;
