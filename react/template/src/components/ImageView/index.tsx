/**
 * 图片预览组件
 */
/**
 * 图片查看组件
 */

import React, { useMemo } from 'react';
import type { ImageProps } from 'antd';
import { Image } from 'antd';
import { IMAGE_VIEW_BASE_URL } from '@/utils/constants';
import { getUserToken } from '@/utils/auth';

const TOKEN = getUserToken();

interface IProps extends ImageProps {
  path: string;
  classNames?: string;
  baseURL?: string;
  style?: React.CSSProperties;
  [K: string]: any;
}

const Index: React.FC<IProps> = ({
  path,
  baseURL = IMAGE_VIEW_BASE_URL,
  classNames,
  preview,
  ...rest
}: IProps) => {
  const src = useMemo(() => {
    if (!path) {
      return '';
    }
    return `${baseURL}?access_token=${TOKEN}&path=${path}`;
  }, [path, baseURL]);

  if (!path || !src) {
    return null;
  }

  return (
    <span
      onClick={(e) => {
        if (preview) {
          e.stopPropagation();
        }
      }}
    >
      <Image preview={preview} style={{ width: '100%' }} src={src} {...rest} />
    </span>
  );
};

export default Index;
