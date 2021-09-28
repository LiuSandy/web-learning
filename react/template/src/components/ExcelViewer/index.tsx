/**
 * excel 预览
 */
import React, { useEffect, useCallback, useState } from 'react';
import XLSX from 'xlsx';
import type { RcFile } from 'antd/lib/upload';

import type { ISheetHTML, ISheetJSON } from './interface';
import { generateData, getSheetJSONData, getSheetHTMLData } from './utils';
import SheetNames from './SheetNames';
import CanvasDataGrid from './CanvasDataGrid';
import styles from './index.less';
import { message } from 'antd';

interface IProps {
  response?: RcFile;
  type?: 'JSON' | 'HTML'; // Excel 渲染方式 JSON 使用 canvas-griddata 方式渲染，HTML 采用富文本方式
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { response, type = 'JSON' } = props;
  const [sheet, setSheet] = useState<ISheetJSON>({});
  const [sheetHtml, setSheetHtml] = useState<ISheetHTML>({});
  const [curSheet, setCurSheet] = useState<string>('');
  // 读取文件 转换为 JSON 数组
  const handleFileToJSON = useCallback((file) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ab = e?.target?.result;
        const wb = XLSX.read(ab, { type: 'array' });
        const { excelJson, firstSheet } = getSheetJSONData(wb);
        setSheet(excelJson);
        setCurSheet(firstSheet);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      message.error('文件解析错误');
    }
  }, []);

  // 读取文件 转换为 HTML
  const handleFileToHTML = useCallback((file) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ab = e?.target?.result;
        const wb = XLSX.read(ab, { type: 'array' });
        const { excelHtml, firstSheet } = getSheetHTMLData(wb);
        setSheetHtml(excelHtml);
        setCurSheet(firstSheet);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      message.error('文件解析错误');
    }
  }, []);

  const handleClick = useCallback((name) => {
    setCurSheet(name);
  }, []);

  useEffect(() => {
    if (response) {
      if (type === 'JSON') {
        handleFileToJSON(response);
      } else {
        handleFileToHTML(response);
      }
    }
  }, [response, handleFileToJSON, handleFileToHTML, type]);
  const { sheetData = [] } = sheet[curSheet] || {};

  if (type === 'JSON') {
    return (
      <div className={styles.wrapper}>
        <SheetNames sheets={Object.keys(sheet)} value={curSheet} onChange={handleClick} />
        {sheetData && sheetData.length > 0 ? (
          <CanvasDataGrid data={generateData({ ...sheet[curSheet] })} />
        ) : null}
      </div>
    );
  }
  const html = sheetHtml[curSheet] || '';
  return (
    <div className={styles.wrapper}>
      <SheetNames sheets={Object.keys(sheetHtml)} value={curSheet} onChange={handleClick} />
      {html && html.length > 0 ? <div className={styles.excel} dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </div>
  );
};
Index.displayName = 'ExcelViewer';
export default Index;
