import { notification } from 'antd';
import { getLocale } from 'umi';
import type { RequestInterceptor, RequestOptionsInit, ResponseInterceptor } from 'umi-request';
import { extend } from 'umi-request';

import { API_URL } from '@/constants';
import { getUserToken } from './auth';
import { isAntDesignProOrDev } from './utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  10002: '登录验证错误！',
}; 

/**
 * 异常处理程序
 */
export const errorHandler = (error: ResponseError): Response => {
  const { response, data } = error;

  // console.log('Response through errorHandler', error);

  if (response) {
    const errorText = codeMessage[data?.code ?? response.status] || data.message;
    const { code, message: resMessage } = data;
    const { status, url } = response;

    let message = `请求错误 ${code || status}`;
    const description = resMessage ?? errorText;

    if (isAntDesignProOrDev()) {
      message += `: ${url}`
    }

    notification.error({
      message,
      description,
    });

    throw error;
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

const translationMap = {
  'en-US': 'en',
  'zh-CN': 'cn',
  'zh-TW': 'cn',
};

export const getCommonHeaders = () => {
  const locale = getLocale();
  const lang = translationMap[locale] ?? locale;

  return {
    'Access-Lang': lang,
  };
};

export const commonHeaderInterceptor: RequestInterceptor = (url, options) => {
  const TOKEN = getUserToken();

  const originalHeaders = { ...options.headers, ...getCommonHeaders() };

  if (TOKEN) {
    return {
      url,
      options: {
        ...options,
        headers: {
          ...originalHeaders,
          'Access-Token': TOKEN,
        },
      },
    };
  }

  return {
    url,
    options: {
      ...options,
      headers: originalHeaders,
    },
  };
};

export const requestInterceptors: RequestInterceptor[] = [commonHeaderInterceptor];

class ResponseError extends Error {
  type: string;
  data?: any;
  response: Response;

  constructor({ response, data }: { response: Response; data?: any }) {
    super('x-error');

    this.name = 'x-error';
    this.type = 'x-type';
    this.response = response;
    this.data = data;
  }
}

// ---- response interceptors
// Codes that are consider to be right, not failure
const RIGHT_CODES = new Set([3404].map(String));
const errorInterceptor: ResponseInterceptor = async (response) => {
  // 网关传回的错误
  if (response.status !== 200) {
    throw new ResponseError({ response });
  }

  const data = await response.clone().json();

  // 服务器端返回的错误
  if (data.code !== '0' && !RIGHT_CODES.has(data.code)) {
    throw new ResponseError({ response, data });
  }

  return response;
};

export const responseInterceptors: ResponseInterceptor[] = [errorInterceptor];

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
  prefix: API_URL,
});

requestInterceptors.forEach((reqInterceptor) => request.interceptors.request.use(reqInterceptor));
responseInterceptors.forEach((resInterceptor) => request.interceptors.response.use(resInterceptor));

const wrappedRequest = <T = any>(
  url: string,
  options: RequestOptionsInit = {},
  useMock = isAntDesignProOrDev(),
): Promise<API.CommonResponse<T>> => {
  const wrappedOptions: RequestOptionsInit = {
    ...options,
    headers: getCommonHeaders(),
  };

  if (useMock) {
    return request(url, { ...wrappedOptions, prefix: '' });
  }

  return request(url, wrappedOptions);
};

const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
METHODS.forEach((method) => {
  wrappedRequest[method] = <T = any>(
    url: string,
    options: RequestOptionsInit,
    useMock = isAntDesignProOrDev(),
  ): Promise<API.CommonResponse<T>> => wrappedRequest(url, { ...options, method }, useMock);
});

export default wrappedRequest;
