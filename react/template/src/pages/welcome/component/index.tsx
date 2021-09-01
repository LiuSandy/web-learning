import { useCallback } from 'react';
import { Divider } from 'antd';
import ProForm, { ProFormGroup } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import type { IFormItemsType } from '@/interface';

import {
  renderCheckbox,
  renderInput,
  renderPassword,
  renderRadio,
  renderSelect,
  renderSwitch,
} from './itemRender';

interface IProps<T> {
  columns: ProColumns<T>[];
  formItemMap: IFormItemsType[];
  onSubmit: (p: T) => Promise<any>
}
function Index<T>(props: IProps<T>) {
  const { columns, formItemMap,onSubmit } = props;

  const filterColumn = useCallback(
    (key) => {
      // 过滤掉 操作栏
      return columns.filter((column) => column.dataIndex === key)[0];
    },
    [columns],
  );

  return (
    <ProForm
      name="welcome"
      onFinish={async (v: T) => {
        onSubmit(v);
      }}
    >
      {formItemMap.map((item, index) => {
        const { children, label } = item;
        const LabelDom = !label ? <Divider /> : <Divider>{label}</Divider>;
        return (
          <ProFormGroup key={index} label={LabelDom}>
            {Object.keys(children).map((key) => {
              // 在columns中找到需要渲染的组件
              const column = filterColumn(key);
              const { valueType } = column;
              // children[key] 中保存着 formItem 的 props
              const formItemProps = children[key];
              if (valueType === 'password') {
                return renderPassword(column, formItemProps);
              }
              if (valueType === 'select') {
                return renderSelect(column, formItemProps);
              }
              if (valueType === 'radio') {
                return renderRadio(column, formItemProps);
              }
              if (valueType === 'checkbox') {
                return renderCheckbox(column, formItemProps);
              }
              if (valueType === 'switch') {
                return renderSwitch(column, formItemProps);
              }
              return renderInput(column, formItemProps);
            })}
          </ProFormGroup>
        );
      })}
    </ProForm>
  );
}

Index.displayName = 'EnhanceForm';

export default Index;
