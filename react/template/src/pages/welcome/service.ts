import request from '@/utils/request';
import type React from 'react';
import type { ColumnsType } from './data';
import qs from 'qs';

export const queryItems = (...args: any) => {
  const qsUrl = qs.stringify({ name: args[0], pattern: args[1] });
  return request(`/warehouse/used/type?${qsUrl}`, {}, false);
};

export const createItem = (data: Omit<ColumnsType, 'id'>) => {
  return request('/warehouse/used/type', { method: 'post', data }, false);
};

export const removeItem = (id: React.Key) => {
  return request('/warehouse/used/type', { method: 'delete', params: { id } }, false);
};

export const updateItem = (data: ColumnsType) => {
  return request('/warehouse/used/type', { method: 'put', data }, false);
};

export const removeItems = (ids: React.Key[]) => {
  return Promise.all(ids.map((id) => removeItem(id)));
};
