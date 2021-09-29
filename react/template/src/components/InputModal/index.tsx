/**
 * Input + Select + Modal
 * 适用场景，输入时自动联想已存在内容，也可以通过对话框的方式进行搜索
 */
import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { AutoComplete, Input, Modal } from 'antd';
import type { AutoCompleteProps } from 'antd';

interface IProps extends Omit<AutoCompleteProps, 'onChange'> {
  options?: any[];
  value?: string;
  onChange?: (P: IProps['value']) => void;
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { options, value, onChange } = props;
  const [visible, { toggle }] = useBoolean(false);

  const selectLabel = options?.find((item) => item.value === value)?.label || '';
  console.log("")
  const handleOnOk = useCallback(() => {
    toggle(false);
  }, [toggle]);

  const handleOnCancel = useCallback(() => {
    toggle(false);
  }, [toggle]);

  return (
    <>
      <AutoComplete
        value={selectLabel}
        dropdownClassName="certain-category-search-dropdown"
        options={options}
        placeholder="请输入"
        onChange={onChange}
      >
        <Input.Search onSearch={()=>{toggle(true)}} />
      </AutoComplete>
      <Modal title="Basic Modal" visible={visible} onOk={handleOnOk} onCancel={handleOnCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

Index.displayName = 'InputModal';

export default Index;
