/* 全局接口定义 */
import type { FormItemProps, FormInstance } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
// formItem 布局
export interface IFormItemsLayout {
  width?: number;
}
// form 表单
export interface IFormItemsType {
  label?: string | undefined;
  children?: Record<string, (FormItemProps & IFormItemsLayout & IFormItemDependency) | null>;
}

// 表单联动属性
export interface IFormItemDependency {
  updateProps?: (
    f: FormInstance<any>,
    c: FormItemProps & IFormItemsLayout & IFormItemDependency,
  ) => FormItemProps & IFormItemsLayout;
}

/* 对 column 类型扩展 */
export type IExtColumns<T = any> = {
  child?: JSX.Element | ((p: ProColumns, f: FormInstance) => JSX.Element) | null;
} & ProColumns<T>;
