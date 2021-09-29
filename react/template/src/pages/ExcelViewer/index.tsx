/**
 * EXCEL 预览组件
 */
import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import ProCard from '@ant-design/pro-card';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam } from 'antd/lib/upload';
import ExcelViewer from '@/components/ExcelViewer';

const Index = () => {
  const [fileResponse, setFileResponse] = useState<RcFile>();
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: UploadChangeParam) {
      if (info.file.status !== 'uploading') {
        const { originFileObj } = info.file;
        setFileResponse(originFileObj);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <ProCard>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <ExcelViewer response={fileResponse} type="HTML" />
    </ProCard>
  );
};

Index.displayName = 'ExcelViewerComponent';

export default Index;
