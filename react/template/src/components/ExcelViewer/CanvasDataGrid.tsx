import React from 'react';
import 'canvas-datagrid';

interface IProps {
  data: string; // 要渲染的数据，JSON 字符串
}

const CanvasDataGrid: React.FC<IProps> = ({ data }: IProps) => {
  return React.createElement('canvas-datagrid', {
    data,
    style: {
      width: '100%',
      minHeight: 400,
      height: 400
    },
  });
};

export default CanvasDataGrid;
