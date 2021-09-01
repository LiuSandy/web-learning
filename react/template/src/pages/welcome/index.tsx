import React, { useCallback, useState, useRef } from 'react';
import { Button, message, Modal, Space } from 'antd';
import { useIntl } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

import { createItem, queryItems, removeItems, updateItem } from './service';
import type { ColumnsType } from './data';
import EnhanceForm from './component';
import type { IFormItemsType } from '@/interface';

const dataTemp = [
  {
    id: '-1',
    input: '测试',
    password: '123123',
    select: 'Processing',
    radio: 'a',
    checkbox: ['A', 'B'],
    switch: true,
  },
];

const Index: React.FC<{}> = () => {
  const { formatMessage } = useIntl();

  const actionRef = useRef<ActionType>();
  const [editRow, setEditRow] = useState<ColumnsType>();
  const [selectedRowsState, setSelectedRows] = useState<ColumnsType[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tableSize, setTableSize] = useState<SizeType>('small');

  const submitterRender = useCallback((_, dom) => {
    return <Space align="end">{dom}</Space>;
  }, []);

  const columns: ProColumns<ColumnsType>[] = [
    {
      title: 'Input',
      dataIndex: 'input',
      fixed: 'left',
      width: 100,
      search: false,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      valueType: 'password',
      width: 100,
    },
    {
      title: 'Select',
      dataIndex: 'select',
      valueType: 'select',
      width: 150,
      valueEnum: {
        all: { text: '全部', status: '' },
        close: { text: '关闭', status: 'Default' },
        running: { text: '运行中', status: 'Processing' },
        online: { text: '已上线', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: 'Radio',
      dataIndex: 'radio',
      valueType: 'radio',
      valueEnum: {
        a: { text: 'a-a-text' },
        b: { text: 'b-b-text' },
        c: { text: 'c-c-text' },
        d: { text: 'd-d-text' },
      },
      width: 150,
      search: false,
    },
    {
      title: 'Checkbox',
      dataIndex: 'checkbox',
      valueType: 'checkbox',
      width: 150,
      search: false,
      valueEnum: {
        A: { text: 'A-text' },
        B: { text: 'B-text' },
        C: { text: 'C-text' },
        D: { text: 'D-text' },
      },
    },
    {
      title: 'Switch',
      dataIndex: 'switch',
      valueType: 'switch',
      width: 150,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <>
          <a
            type="default"
            key="editable"
            onClick={() => {
              setEditModalVisible(true);
              setEditRow(record);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const formItemMap: IFormItemsType[] = [
    {
      label: 'Text',
      children: {
        input: {
          width: 'sm',
        },
        password: {
          rules: [
            {
              required: true,
              message: '必填项',
            },
          ],
        },
      },
    },
    {
      label: 'Select',
      children: {
        select: {},
        radio: {
          dependencies: ['select'],
          updateProps: (form, c) => {
            const v = form.getFieldValue('select');
            return {
              ...c,
              disabled: v === 'close',
            };
          },
        },
        checkbox: {
          dependencies: ['select'],
          updateProps: (form, c) => {
            const v = form.getFieldValue('select');
            return {
              ...c,
              disabled: v === 'close',
              rules: [...(c?.rules || []), { required: v === 'running', message: '必填项' }],
            };
          },
        },
      },
    },
    {
      children: {
        switch: {},
      },
    },
  ];

  const onRequestItems = async (name?: string) => {
    const response = await queryItems(name);
    const { data } = response;
    const { list, total } = data;
    const result = {
      total,
      data: list,
      success: true,
    };

    return result;
  };

  const handleAdd = async (fields: Omit<ColumnsType, 'id'>) => {
    const hide = message.loading(formatMessage({ id: 'request.create' }));
    try {
      await createItem({ ...fields });
      hide();
      message.success(formatMessage({ id: 'request.create.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(formatMessage({ id: 'request.create.fail' }));
      return false;
    }
  };

  const onCreate = async (params: Omit<ColumnsType, 'id'>) => {
      console.log("--->",params)
    // const success = await handleAdd({ ...params, pattern: Number(params.pattern) });
    // if (success) {
    //   setCreateModalVisible(false);
    //   if (actionRef.current) {
    //     actionRef.current.reload();
    //   }
    // }
  };

  const handleEdit = async (fields: ColumnsType) => {
    const hide = message.loading(formatMessage({ id: 'request.edit' }));
    try {
      await updateItem({ ...fields, pattern: Number(fields.pattern) });
      hide();
      message.success(formatMessage({ id: 'request.edit.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(formatMessage({ id: 'request.edit.fail' }));
      return false;
    }
  };

  const onEdit = async (params: ColumnsType) => {
    const { id } = editRow!;
    const success = await handleEdit({ ...params, id });
    if (success) {
      setEditModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  };

  const handleRemove = async (selectedRows: ColumnsType[]) => {
    const selectedIds = selectedRows.map(({ id }) => id);

    const hide = message.loading(formatMessage({ id: 'request.remove' }));
    try {
      await removeItems(selectedIds);
      hide();
      message.success(formatMessage({ id: 'request.remove.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(formatMessage({ id: 'request.remove.fail' }));
      return false;
    }
  };

  return (
    <PageContainer breadcrumb={undefined}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        size={tableSize}
        onSizeChange={(size) => setTableSize(size)}
        options={{
          fullScreen: true,
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => setCreateModalVisible(true)} key="create">
            <PlusOutlined /> 新增
          </Button>,
        ]}
        // request={(params) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   return onRequestItems(params.name);
        // }}
        dataSource={dataTemp}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          checkStrictly: true,
        }}
        scroll={{ x: 'max-content' }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              {formatMessage(
                { id: 'component.footerToolbar.selected' },
                { number: <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> },
              )}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {formatMessage({ id: 'component.footerToolbar.batchRemove' })}
          </Button>
        </FooterToolbar>
      )}
      {/* 新建 Modal */}
      <Modal
        destroyOnClose
        title="新增"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={960}
      >
        <EnhanceForm<ColumnsType> columns={columns} formItemMap={formItemMap} onSubmit={onCreate} />
      </Modal>

      {/* 编辑 Modal */}
      <Modal
        destroyOnClose
        title="编辑"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        width={600}
        footer={null}
        centered
      >
        <ProTable<ColumnsType, ColumnsType>
          onSubmit={onEdit}
          rowKey="key"
          type="form"
          columns={columns}
          form={{
            initialValues: editRow,
            requiredMark: false,
            submitter: {
              render: submitterRender,
            },
          }}
        />
      </Modal>
    </PageContainer>
  );
};

Index.displayName = 'Welcome';

export default Index;
