import { KEY_USER_TOKEN } from '@/constants';

export const getUserToken = () => window.localStorage.getItem(KEY_USER_TOKEN);
export const setUserToken = (token: string) => window.localStorage.setItem(KEY_USER_TOKEN, token);
export const removeUserToken = () => window.localStorage.removeItem(KEY_USER_TOKEN);
