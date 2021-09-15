import { Button, Col, Form, Row, Space, Spin, Tabs } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'umi';
import Item from '../itemRender';
import type { IExtColumns, IFormItemsType } from '../interface';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import styles from '../index.less';

const { TabPane } = Tabs;

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
  const [activeKey, setActiveKey] = useState('0');

  const { formatMessage } = useIntl();

  const filterColumn = useCallback(
    (key) => {
      // 过滤掉 操作栏
      return columns.filter((column) => column.dataIndex === key)[0] || null;
    },
    [columns],
  );

  const tabList = useMemo(() => {
    return formItemMap.map((item, index) => ({
      tab: item.label,
      key: `${index}`,
    }));
  }, [formItemMap]);
  return (
    <PageContainer
      loading={loading}
      breadcrumb={undefined}
      tabList={tabList}
      tabActiveKey={activeKey}
      onTabChange={setActiveKey}
      className={styles.tabWrapper}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        className={styles.wrapper}
        onFinish={async (v: T) => {
          onSubmit(v);
        }}
      >
        <ProCard style={{ height: '100%' }}>
          <Tabs activeKey={activeKey} className={styles.tabsStyle}>
            {formItemMap.map((item, index) => {
              const { children } = item;
              return (
                // 修改为 Tab
                <TabPane key={`${index}`}>
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
                        return null;
                      })}
                    </Row>
                  )}
                </TabPane>
              );
            })}
          </Tabs>
        </ProCard>
        <FooterToolbar>
          <Form.Item key="button-group" wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
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
        </FooterToolbar>
      </Form>
    </PageContainer>
  );
}

Index.displayName = 'EnhanceForm';

export default Index;
