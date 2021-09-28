/**
 * excel 预览
 */
import { useEffect, useCallback, useState } from 'react';
import XLSX from 'xlsx';
import type { ISheetJSON } from './interface';
import { generateData, getSheetData } from './utils';
import SheetNames from './SheetNames';
import CanvasDataGrid from './CanvasDataGrid';
import styles from './index.less';

function OutTable({ data, cols }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Index = (props) => {
  const { response } = props;
  const [sheet, setSheet] = useState<ISheetJSON>({});
  const [curSheet, setCurSheet] = useState<string>('');
  const handleFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      const excelJson = getSheetData(wb);
      setSheet(excelJson);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleClick = useCallback((name) => {
    setCurSheet(name);
  }, []);

  useEffect(() => {
    if (response) {
      handleFile(response);
    }
  }, [response, handleFile]);
  const { sheetData = [], sheetCols } = sheet[curSheet] || {};
  return (
    <div className={styles.wrapper}>
      <SheetNames sheets={Object.keys(sheet)} value={curSheet} onChange={handleClick} />
      {sheetData && sheetData.length > 1 ? (
        <CanvasDataGrid data={generateData({ ...sheet[curSheet] })} />
      ) : null}
    </div>
  );
};
Index.displayName = 'ExcelViewer';
export default Index;
