/**
 * 相关类型定义
 */
import type { FormInstance } from 'antd';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import type { ColProps } from 'antd/lib/grid';

export interface IFormProps extends FormItemProps {
  updateProps?: (f: FormInstance,c: IFormProps) => IFormProps
}

export interface IFormItemProps {
  type?: string | 'text';
  field: string;
  label?: string | React.ReactNode | null;
  child: React.ReactElement | ((f: FormInstance) => React.ReactElement) | null;
  formProps?: IFormProps;
  tips?: string | React.ReactElement;
  span?: number;
  colProps?: ColProps;
}
