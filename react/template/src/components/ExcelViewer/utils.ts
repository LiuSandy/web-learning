import type { WorkBook } from 'xlsx';
import XLSX from 'xlsx';
import type { ISheetData, ISheetHTML, ISheetJSON } from './interface';

export const make_cols = (refstr: string) => {
  const o = [];
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

/**
 * 计算单元格合并
 */
export const mergerCells = (wb) => {
  const out = [];
  wb.SheetNames.forEach((name) => {
    const o = { name, rows: {}, merges: [] };
    const ws = wb.Sheets[name]; // <-- add merges array
    (ws['!merges'] || []).forEach((m) => {
      const mergestr = typeof m === 'string' ? m : XLSX.utils.encode_range(m);
      o.merges.push(mergestr);
      const mergeobj = XLSX.utils.decode_range(mergestr);
      if (!o.rows[mergeobj.s.r]) return;
      if (!o.rows[mergeobj.s.r].cells[mergeobj.s.c]) return;
      o.rows[mergeobj.s.r].cells[mergeobj.s.c].merge = [
        mergeobj.e.r - mergeobj.s.r,
        mergeobj.e.c - mergeobj.s.c,
      ];
    });
  });
};

/**
 * 读取 Excel 文件为JSON
 */
export const getSheetJSONData = (wb: WorkBook) => {
  const res: ISheetJSON = {};
  const { SheetNames } = wb;
  SheetNames.forEach((wsname) => {
    // 当前 sheet 内容
    const ws = wb.Sheets[wsname];
    const sheetData = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 }) as any;
    const sheetCols = make_cols(ws['!ref'] || '');
    res[wsname] = {
      sheetData,
      sheetCols,
    };
  });
  return { excelJson: res, firstSheet: SheetNames[0] };
};

/**
 * 读取 Excel 文件为 HTML
 */
export const getSheetHTMLData = (wb: WorkBook) => {
  const res: ISheetHTML = {};
  const { SheetNames } = wb;
  SheetNames.forEach((wsname) => {
    // 当前 sheet 内容
    const ws = wb.Sheets[wsname];
    const sheetHtml = XLSX.utils.sheet_to_html(ws);
    res[wsname] = sheetHtml;
  });
  return { excelHtml: res, firstSheet: SheetNames[0] };
};

/**
 * 使用 canvas-datagrid 渲染表格，需要把数据转化为 JSON 串
 * 存在问题：合并单元格
 */
export const generateData = (config: ISheetData) => {
  const { sheetData, sheetCols } = config;
  const columns = sheetCols.map((item) => item.name);
  const dataGrid = sheetData.map((item) => {
    const row = {};

    columns.forEach((column, index) => {
      row[column] = item[index] || '';
    });
    return row;
  });
  return JSON.stringify(dataGrid);
};
