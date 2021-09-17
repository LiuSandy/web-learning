import { Button, Col, Form, Row, Space, Tabs } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'umi';
import Item from '../itemRender';
import type { IExtColumns, IFormItemsType } from '../interface';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import styles from '../index.less';

const { TabPane } = Tabs;

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
  hidePageContainer?: boolean;
  className?: string;
  tabClassName?: string;
}

function Index<T>(props: IProps<T>) {
  const {
    formItemMap,
    columns,
    initialValues,
    actions,
    loading = false,
    hidePageContainer = false,
    className,
    tabClassName,
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
      key: item.key || `${index}`,
    }));
  }, [formItemMap]);

  const pageContainerProps = useMemo(() => {
    const tempProps = {
      className: classNames(className, {
        [styles.hidePageContainer]: hidePageContainer,
      }),
    };
    if (hidePageContainer) {
      return tempProps;
    }
    return {
      ...tempProps,
      tabList,
      tabActiveKey: activeKey,
      onTabChange: setActiveKey,
    };
  }, [hidePageContainer, className, tabList, activeKey]);

  const tabsProps = useMemo(() => {
    const tempProps = {
      className: classNames(tabClassName, {
        [styles.hideTabs]: !hidePageContainer,
      }),
      activeKey,
    };
    if (!hidePageContainer) {
      return tempProps;
    }
    return {
      ...tempProps,
      onChange: setActiveKey,
    };
  }, [hidePageContainer, tabClassName, activeKey]);

  return (
    <PageContainer loading={loading} breadcrumb={undefined} {...pageContainerProps}>
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
        <ProCard style={{ height: '100%' }}>
          <Tabs {...tabsProps} destroyInactiveTabPane>
            {formItemMap.map((item, index) => {
              const { children, label } = item;
              return (
                // 修改为 Tab
                <TabPane key={item.key || `${index}`} tab={label}>
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
        <FooterToolbar className={styles.footerStyle}>
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
