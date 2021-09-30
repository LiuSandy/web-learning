import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import InputModal from '@/components/InputModal';

interface IProps {
  value?: string;
  onChange?: (P: IProps['value']) => void;
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { value, onChange } = props;
  const [visible, { toggle }] = useBoolean(false);

  const handleOnCancel = useCallback(() => {
    toggle(false);
  }, [toggle]);
  return (
    <InputModal
      value={value}
      onChange={onChange}
      visible={visible}
      onCancel={handleOnCancel}
      onModalSearch={() => toggle(true)}
      options={[
        { value: 'a', label: 'Light' },
        { value: 'b', label: 'Bamboo' },
      ]}
      modalProps={{
        title:'选择客户'
      }}
    >
      <p>content</p>
    </InputModal>
  );
};

export default Index;
