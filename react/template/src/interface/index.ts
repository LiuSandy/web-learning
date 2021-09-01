/* 全局接口定义 */
import type { FormItemProps, FormInstance } from '@ant-design/pro-form';
// formItem 布局
export interface IFormItemsLayout {
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
}
// form 表单
export interface IFormItemsType {
  label?: string | undefined;
  children: Record<string, FormItemProps & IFormItemsLayout & IFormItemDependency>;
}

// 表单联动属性
export interface IFormItemDependency {
  updateProps?: (
    f: FormInstance,
    c: FormItemProps & IFormItemsLayout & IFormItemDependency,
  ) => FormItemProps & IFormItemsLayout;
}
