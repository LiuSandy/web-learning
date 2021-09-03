import type { IFormItemDependency, IFormItemsLayout } from '@/interface';
import type { FormItemProps } from '@ant-design/pro-form';
import {
  ProFormSwitch,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormCheckbox,
  ProFormDependency,
} from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { Col } from 'antd';

const defaultLayout: IFormItemsLayout = {};

export const renderInput = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { width } = formItemProps;
  const { dataIndex, title } = column;
  return (
    <Col span={width}>
      <ProFormText
        labelAlign="right"
        {...defaultLayout}
        name={dataIndex}
        label={title}
        style={{ width: '100%' }}
      />
    </Col>
  );
};

export const renderSelect = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { valueEnum, dataIndex, title } = column;
  return (
    <ProFormSelect
      {...defaultLayout}
      name={dataIndex}
      label={title}
      valueEnum={valueEnum}
      {...formItemProps}
    />
  );
};

export const renderRadio = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { valueEnum, dataIndex, title } = column;
  const options = Object.keys(valueEnum).map((optionKey) => ({
    label: valueEnum?.[optionKey]?.text || optionKey,
    value: optionKey,
  }));
  return (
    <ProFormRadio.Group
      {...defaultLayout}
      name={dataIndex}
      label={title}
      options={options}
      {...formItemProps}
    />
  );
};

export const renderCheckbox = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { valueEnum, dataIndex, title } = column;
  const options = Object.keys(valueEnum).map((optionKey) => ({
    label: valueEnum?.[optionKey]?.text || optionKey,
    value: optionKey,
  }));
  const { dependencies = [], updateProps } = formItemProps;
  return (
    <ProFormDependency name={dependencies}>
      {(_, form) => {
        const newProps = updateProps ? updateProps(form, formItemProps) : formItemProps;
        return (
          <ProFormCheckbox.Group
            {...defaultLayout}
            name={dataIndex}
            label={title}
            options={options}
            {...newProps}
          />
        );
      }}
    </ProFormDependency>
  );
};

export const renderSwitch = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { dataIndex, title } = column;
  return <ProFormSwitch {...defaultLayout} name={dataIndex} label={title} {...formItemProps} />;
};

export const renderPassword = (
  column: ProColumns,
  formItemProps: FormItemProps & IFormItemsLayout & IFormItemDependency,
) => {
  const { dataIndex, title } = column;
  return (
    <ProFormText.Password {...defaultLayout} name={dataIndex} label={title} {...formItemProps} />
  );
};
