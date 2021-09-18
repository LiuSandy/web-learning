/**
 * 上传图片组件
 */
import { useState, useCallback } from 'react';
import { useIntl } from 'umi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { getFileExtension } from '@/utils/utils';

interface IProps extends Omit<UploadProps, 'onChange'> {
  accept: string;
  maxSize?: number; // 上传大小限制单位为M,默认没有限制
  action: string; // 上传图片地址
  value?: string;
  onChange?: (P: string) => void;
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { value, accept, maxSize = Number.MAX_SAFE_INTEGER, action, onChange, ...rest } = props;
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const beforeUpload = useCallback(
    (file: RcFile) => {
      const isAccept = accept
        .split(',')
        .some((item) => getFileExtension(file.name) === item.toLowerCase());

      if (!isAccept) {
        message.error(formatMessage({ id: '上传文件类型限制' }, { type: accept }));
      }
      const isLt2M = file.size / 1024 / 1024 < maxSize;
      if (!isLt2M) {
        message.error(formatMessage({ id: '上传文件大小限制' }, { size: maxSize }));
      }
      return isAccept && isLt2M;
    },
    [maxSize, accept, formatMessage],
  );

  const handleChange = useCallback(
    (info: UploadChangeParam) => {
      const { file } = info;
      if (file.status === 'uploading') {
        setLoading(true);
      }
      if (file.status === 'done') {
        setLoading(false);
        if (onChange && file.response.code === '0') {
          onChange(file.response.data);
        }
      }
    },
    [onChange],
  );

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={action}
      beforeUpload={beforeUpload}
      {...rest}
      onChange={handleChange}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

Index.displayName = 'Upload';

export default Index;
