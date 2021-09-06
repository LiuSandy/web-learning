import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import type { IExtColumns, IFormItemDependency, IFormItemsLayout } from './interface';
import type { FormItemProps } from '@ant-design/pro-form';

type IFormItemProps = FormItemProps & IFormItemsLayout & IFormItemDependency;
interface IProps {
  column: IExtColumns;
  formItemProps: IFormItemProps;
}

export function renderInput(column: ProColumns, formItemProps: IFormItemProps) {
  return (
    <Form.Item name={column.dataIndex} label={column.title} labelAlign="right" {...formItemProps}>
      <Input />
    </Form.Item>
  );
}

function Item(props: IProps) {
  const { column, formItemProps } = props;
  const { dataIndex, title, child } = column;
  if (!child) {
    return null;
  }

  const { dependencies = [], updateProps, ...rest } = formItemProps;
  return (
    <Form.Item noStyle dependencies={dependencies}>
      {(form: FormInstance) => {
        const newProps = updateProps ? updateProps(form, rest) : rest;
        let element: null | JSX.Element = null;
        if (typeof child === 'function') {
          element = child(column, form);
        } else {
          element = child;
        }
        return (
          <Form.Item name={dataIndex} label={title} {...newProps}>
            {element}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
}

export default Item;
