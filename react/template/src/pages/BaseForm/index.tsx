import type { IFormItemProps } from '@/components/Form/BaseForm';
import BaseForm from '@/components/Form/BaseForm';
import Upload from '@/components/Upload';
import type { FormInstance } from 'antd';
import { Checkbox, Card, Divider, Input, Radio, Select } from 'antd';

const options = [
  { text: '全部', status: '', key: 'all' },
  { text: '关闭', status: 'Default', key: 'close' },
  { text: '运行中', status: 'Processing', key: 'running' },
  { text: '已上线', status: 'Success', key: 'online' },
  { text: '异常', status: 'Error', key: 'error' },
];

const radioOptions = [
  { value: 'a', text: 'a-a-text' },
  { value: 'b', text: 'b-b-text' },
  { value: 'c', text: 'c-c-text' },
  { value: 'd', text: 'd-d-text' },
];

const checkboxOptions = [
  { value: 'A', text: 'a-A-text' },
  { value: 'B', text: 'b-B-text' },
  { value: 'C', text: 'c-C-text' },
  { value: 'D', text: 'd-D-text' },
];

const Index = () => {
  const items: IFormItemProps[] = [
    {
      label: 'Input',
      field: 'input',
      child: <Input />,
    },
    {
      label: 'Input-1',
      field: 'input1',
      span: 16,
      child: <Input />,
    },
    {
      label: 'Input-2',
      field: 'input2',
      child: <Input />,
    },
    {
      label: 'Input-3',
      field: 'input3',
      child: <Input />,
      formProps: {
        rules: [
          {
            required: true,
            message: 'xxx',
          },
        ],
      },
    },
    {
      label: 'Input-4',
      field: 'input4',
      child: <Input />,
    },
    {
      label: '密码',
      field: 'password',
      child: <Input.Password />,
      formProps: {
        rules: [
          {
            required: true,
            message: '必填项',
          },
        ],
      },
    },
    {
      type: 'text',
      field: 'Divider',
      child: <Divider>Select</Divider>,
    },
    {
      label: 'Select',
      field: 'select',
      child: () => {
        return (
          <Select style={{ width: '100%' }}>
            {options.map((i) => {
              return (
                <Select.Option key={i.key} value={i.key}>
                  {i.text}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      label: 'Radio',
      field: 'radio',
      span: 16,
      formProps: {
        dependencies: ['select'],
      },
      child: (formRef: FormInstance) => {
        const selectType = formRef.getFieldValue('select');
        return (
          <Radio.Group style={{ width: '100%' }} disabled={selectType === 'close'}>
            {radioOptions.map((i) => {
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
      label: 'CheckBox',
      field: 'checkbox',
      span: 16,
      formProps: {
        dependencies: ['select'],
        updateProps: (formRef, c) => {
          const v = formRef.getFieldValue('select');
          return {
            ...c,
            rules: [...(c?.rules || []), { required: v === 'running', message: '必填项' }],
          };
        },
      },
      child: (
        <Checkbox.Group style={{ width: '100%' }}>
          {checkboxOptions.map((i) => {
            return (
              <Checkbox key={i.value} value={i.value}>
                {i.text}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      ),
    },
    {
      label: 'logo',
      span: 24,
      field: 'upload',
      child: <Upload maxSize={5} action="" accept="jpeg,jpg,png" />,
    },
  ];

  return (
    <Card>
      <BaseForm footer items={items} onSubmit={(v) => console.log(v)} />
    </Card>
  );
};

export default Index;
