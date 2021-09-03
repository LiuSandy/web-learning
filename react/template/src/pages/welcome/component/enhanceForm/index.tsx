import type { IExtColumns, IFormItemsType } from '@/interface';
import { Col, Divider, Form, Row } from 'antd';
import React, { useCallback } from 'react';
import Item from './itemRender';

interface IProps<T> {
  columns: IExtColumns<T>[];
  formItemMap: IFormItemsType[];
  onSubmit: (p: T) => Promise<any>;
}

function Index<T>(props: IProps<T>) {
  const { formItemMap, columns, onSubmit } = props;
  const [form] = Form.useForm();

  const filterColumn = useCallback(
    (key) => {
      // 过滤掉 操作栏
      return columns.filter((column) => column.dataIndex === key)[0];
    },
    [columns],
  );
  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={async (v: T) => {
        onSubmit(v);
      }}
    >
      {formItemMap.map((item, index) => {
        const { children, label } = item;

        return (
          <React.Fragment key={index}>
            {label === undefined ? null : <Divider>{label}</Divider>}
            <Row>
              {Object.keys(children).map((key) => {
                const column = filterColumn(key);
                const { width = 8, ...rest } = children[key];
                return (
                  <Col key={key} span={width}>
                    <Item column={column} formItemProps={rest} />
                  </Col>
                );
              })}
            </Row>
          </React.Fragment>
        );
      })}
    </Form>
  );
}

Index.displayName = 'EnhanceForm';

export default Index;
