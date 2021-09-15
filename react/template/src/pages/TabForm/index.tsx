import type { IExtColumns, IFormItemsType } from '@/interface';
import type { ProColumns } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { Button } from 'antd';
import { Input, Radio, Select, Checkbox, Switch } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import TabForm from '@/components/Form/TabForm';
import { PageContainer } from '@ant-design/pro-layout';

const Index = () => {
  const columns: IExtColumns<ColumnsType>[] = [
    {
      title: 'Input',
      dataIndex: 'input',
      fixed: 'left',
      width: 100,
      search: false,
      child: <Input />,
    },
    {
      title: 'In',
      dataIndex: 'input1',
      fixed: 'left',
      width: 100,
      search: false,
      child: <Input />,
    },
    {
      title: 'Input2-put1',
      dataIndex: 'input2',
      fixed: 'left',
      width: 100,
      search: false,
      child: <Input />,
    },
    {
      title: 'Input3',
      dataIndex: 'input3',
      fixed: 'left',
      width: 100,
      search: false,
      child: <Input />,
    },
    {
      title: 'Input4',
      dataIndex: 'input4',
      fixed: 'left',
      width: 100,
      search: false,
      child: <Input />,
    },

    {
      title: 'Password',
      dataIndex: 'password',
      valueType: 'password',
      width: 100,
      child: () => {
        return <Input.Password />;
      },
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
      child: ({ valueEnum }: ProColumns) => {
        const options = Object.keys(valueEnum).map((k) => ({
          value: k,
          text: valueEnum?.[k].text,
        }));
        return (
          <Select style={{ width: '100%' }}>
            {options.map((i) => {
              return (
                <Select.Option key={i.value} value={i.value}>
                  {i.text}
                </Select.Option>
              );
            })}
          </Select>
        );
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
      child: ({ valueEnum }: ProColumns, formRef: FormInstance) => {
        const options = Object.keys(valueEnum).map((k) => ({
          value: k,
          text: valueEnum?.[k].text,
        }));
        const selectType = formRef.getFieldValue('select');
        return (
          <Radio.Group style={{ width: '100%' }} disabled={selectType === 'close'}>
            {options.map((i) => {
              return (
                <Radio key={i.value} value={i.value}>
                  {i.text}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      },
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
      child: ({ valueEnum }: ProColumns) => {
        const options = Object.keys(valueEnum).map((k) => ({
          value: k,
          text: valueEnum?.[k].text,
        }));
        return (
          <Checkbox.Group style={{ width: '100%' }}>
            {options.map((i) => {
              return (
                <Checkbox key={i.value} value={i.value}>
                  {i.text}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      },
    },
    {
      title: 'Switch',
      dataIndex: 'switch',
      valueType: 'switch',
      width: 150,
      search: false,
      child: <Switch />,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 100,
    },
  ];

  const formItemMap: IFormItemsType[] = [
    {
      label: 'Text',
      children: {
        input: {
          width: 8,
        },
        input1: {
          width: 16,
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        },
        input2: {},
        input3: {
          rules: [
            {
              required: true,
              message: 'xxx',
            },
          ],
        },
        input4: {},
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
          width: 16,
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
          width: 16,
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
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

  const handleSubmit = (v) => {
    console.log(v);
    return new Promise((resolve) => {
      resolve('Xxx');
    });
  };

  return (
    <TabForm hidePageContainer columns={columns} formItemMap={formItemMap} onSubmit={handleSubmit} />
  );
};

Index.displayName = 'TabForm';

export default Index;
