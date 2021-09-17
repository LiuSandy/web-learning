import { Button, Col, Divider, Form, Row, Space, Spin } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from 'umi';
import Item from './itemRender';
import type { IExtColumns, IFormItemsType } from './interface';
import styles from './index.less';

const defaultLayout = {
  labelCol: {
    flex: "0 0 130px"
  },
  wrapperCol: {
    flex: "auto"
  }
};
interface IProps<T> {
  columns: IExtColumns<T>[];
  formItemMap: IFormItemsType[];
  initialValues?: T | {};
  onSubmit: (p: T) => Promise<any>;
  actions?: JSX.Element | JSX.Element[] | null;
  refresh?: (P?: any) => void;
  loading?: boolean;
}

function Index<T>(props: IProps<T>) {
  const {
    formItemMap,
    columns,
    initialValues,
    actions,
    loading = false,
    refresh,
    onSubmit,
  } = props;
  const [form] = Form.useForm();

  const { formatMessage } = useIntl();

  const filterColumn = useCallback(
    (key) => {
      // 过滤掉 操作栏
      return columns.filter((column) => column.dataIndex === key)[0] || null;
    },
    [columns],
  );
  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="horizontal"
        {...defaultLayout}
        initialValues={initialValues}
        className={styles.wrapper}
        onFinish={async (v: T) => {
          onSubmit(v);
        }}
      >
        {formItemMap.map((item, index) => {
          const { children, label } = item;
          return ( 
            // 修改为 Tab
            <React.Fragment key={index}>
              {label === undefined ? null : (
                <Divider className={styles.dividerStyle}>{label}</Divider>
              )}
              {children && (
                <Row>
                  {Object.keys(children).map((key) => {
                    const column = filterColumn(key);
                    if (!column) {
                      return null;
                    }
                    if (children[key]) {
                      const { width = 8, ...rest } = children[key];
                      if (!column.child) {
                        return null;
                      }
                      return (
                        <Col key={key} span={width}>
                          <Item column={column} formItemProps={rest} />
                        </Col>
                      );
                    }
                    return <></>;
                  })}
                </Row>
              )}
            </React.Fragment>
          );
        })}
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
      </Form>
    </Spin>
  );
}

Index.displayName = 'EnhanceForm';

export default Index;
