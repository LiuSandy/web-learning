/**
 * 基础 Form 组件
 */

import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'umi';
import type { FormInstance, FormProps, RowProps } from 'antd';
import { Form, Row, Col, Button, Space, Spin } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';

import type { IFormItemProps } from './interface';

const defaultLayout = {
  labelCol: {
    flex: "0 0 130px"
  },
  wrapperCol: {
    flex: "auto"
  }
};
interface IProps<T> extends FormProps {
  items: IFormItemProps[];
  onSubmit: (p: T) => void;
  refresh?: (P?: any) => void;
  loading?: boolean;
  rowProps?: RowProps;
  actions?: JSX.Element | JSX.Element[] | null; // 扩展操作按钮
  footer?: boolean | React.ReactElement | null;
}

function BaseForm<T>(props: IProps<T>) {
  const {
    actions,
    refresh,
    loading = false,
    items,
    initialValues,
    rowProps = {},
    footer = false,
    onSubmit,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const footerElement = useMemo(() => {
    return (
      <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
        <Space>
          {actions}
          {refresh ? (
            <Button type="primary" onClick={refresh}>
              {formatMessage({ id: '刷新' })}
            </Button>
          ) : null}
          <Button type="primary" htmlType="submit">
            {formatMessage({ id: '保存' })}
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            {formatMessage({ id: '重置' })}
          </Button>
        </Space>
      </Form.Item>
    );
  }, [actions, refresh, form, formatMessage]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="horizontal"
        {...defaultLayout}
        {...rest}
        onFinish={async (v: T) => {
          onSubmit(v);
        }}
      >
        <Row gutter={[8, 8]} {...rowProps}>
          {items.map((item) => {
            const { span = 8, type, field, child, label, formProps = {}, colProps = {} } = item;
            if (!child) {
              return null;
            }

            if (type === 'text' && typeof child !== 'function') {
              //  非 FormItem 只渲染 child
              return (
                <Col key={field} span={24}>
                  {child}
                </Col>
              );
            }
            const { dependencies = [], updateProps, ...formRest } = formProps;
            return (
              <Form.Item noStyle dependencies={dependencies}>
                {(formRef: FormInstance) => {
                  const newProps = updateProps ? updateProps(form, formRest) : formRest;
                  let element: React.ReactElement | null = null;
                  if (typeof child === 'function') {
                    element = child(formRef);
                  } else {
                    element = child;
                  }
                  return (
                    <Col key={field} span={span} {...colProps}>
                      <Form.Item {...newProps} name={field} label={label}>
                        {element}
                      </Form.Item>
                    </Col>
                  );
                }}
              </Form.Item>
            );
          })}
        </Row>
        {!footer ? footerElement : <FooterToolbar>{footerElement}</FooterToolbar>}
      </Form>
    </Spin>
  );
}

export * from './interface';

export default BaseForm;
