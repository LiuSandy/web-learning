/**
 * Input + Select + Modal
 * 适用场景，输入时自动联想已存在内容，也可以通过对话框的方式进行搜索
 */
import React, { useCallback } from 'react';
import { AutoComplete, Input, Modal } from 'antd';
import type { AutoCompleteProps, ModalProps } from 'antd';
import { useBoolean } from 'ahooks';

interface IProps extends Omit<AutoCompleteProps, 'onChange'> {
  options?: any[];
  /* 表单数据 */
  value?: string;
  onChange?: (P: IProps['value']) => void;
  children?: React.ReactNode;
  /* 对话框属性 */
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  modalProps?: ModalProps;
  onModalSearch?: () => void;
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { options, value, children, onChange, modalProps, onModalSearch, ...rest } = props;
  const [open, { toggle }] = useBoolean(false);
  const selectLabel = options?.find((item) => item.value === value)?.label || '';

  const handleOpenChange = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <>
      <AutoComplete
        value={selectLabel}
        dropdownClassName="certain-category-search-dropdown"
        options={options}
        placeholder="请输入"
        onChange={onChange}
        onBlur={handleOpenChange}
        onFocus={handleOpenChange}
        open={open}
        {...rest}
      >
        <Input.Search
          onSearch={(v, e) => {
            e?.stopPropagation();
            onModalSearch?.();
          }}
        />
      </AutoComplete>
      <Modal footer={null} {...modalProps} {...rest}>
        {children}
      </Modal>
    </>
  );
};

Index.displayName = 'InputModal';

export default Index;
