/**
 * Excel 预览 多个 sheet
 */
import { useCallback } from 'react';
import { Radio } from 'antd';
import styles from './index.less'

interface IProps {
  value: string;
  sheets: string[];
  onChange: (sheet: IProps['value']) => void;
}

const SheetNames: React.FC<IProps> = (props: IProps) => {
  const { value, onChange, sheets = [] } = props;

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <Radio.Group className={styles.sheets} onChange={handleChange} value={value} size="small">
      {sheets.map((sheet) => (
        <Radio.Button key={sheet} value={sheet}>
          {sheet}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default SheetNames;
