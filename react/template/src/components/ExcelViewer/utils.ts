import type { WorkBook } from 'xlsx';
import { cloneDeep } from 'lodash';
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
 * sheet_to_html 字符串中构建 columns 和 rows
 * @param html sheet_to_html 生成的 HTML 字符串
 * @param columns 计算 A~Z
 */
const generateHTML = (html: string, columns: ISheetData['sheetCols']): string => {
  const fragment = document.createElement('div');
  fragment.innerHTML = html;
  const trList = fragment.querySelectorAll('tr');
  // 为每个 tr 增加索引
  trList.forEach((tr, index) => {
    const td = tr.querySelectorAll('td')[0];
    const newTd = td.cloneNode();
    const rowTd = tr.insertBefore(newTd, td) as HTMLElement;
    if (rowTd.hasAttribute('rowspan')) {
      // 如果有上下合并情况，取消合并
      rowTd.removeAttribute('rowspan');
    }
    rowTd.setAttribute('v', `${index + 1}`);
    rowTd.setAttribute(
      'style',
      'background-color: rgba(240, 240, 240, 1);width:50px !important;',
    );
    rowTd.innerHTML = `${index + 1}`;
  });
  // 新增一行 增加 A~Z
  const newTr = document.createElement('tr');
  const zeroTd = document.createElement('td');
  zeroTd.setAttribute('v', '0');
  zeroTd.innerHTML = '';
  zeroTd.setAttribute(
    'style',
    'background-color: rgba(240, 240, 240, 1);width:50px !important;',
  );
  newTr.append(zeroTd);
  columns.forEach(({ name }) => {
    const td = document.createElement('td');
    td.setAttribute('v', name);
    td.innerHTML = name;
    td.setAttribute(
      'style',
      'background-color: rgba(240, 240, 240, 1)',
    );
    newTr.append(td);
  });
  const tbody = fragment.querySelector('tbody');

  tbody?.insertBefore(newTr, trList[0]);
  return fragment.outerHTML;
};

/**
 * 读取 Excel 文件为 HTML
 */
export const getSheetHTMLData = (wb: WorkBook) => {
  const res: ISheetHTML = {};
  const { SheetNames } = wb;
  SheetNames.forEach((wsname, index) => {
    // 当前 sheet 内容
    const ws = wb.Sheets[wsname];
    const sheetHtml = XLSX.utils.sheet_to_html(ws, { id: `sheet-${index + 1}` });
    const sheetCols = make_cols(ws['!ref'] || '');
    const html = generateHTML(sheetHtml, sheetCols);
    res[wsname] = html;
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
