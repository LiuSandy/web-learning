/**
 * 全局变量
 */
/* 认证不通过跳转路由 */
export const LOGIN_ROUTE = '/'

/**
 * 不需要认证的路由
 * 如果为空，默认都不需要认证
 * ['/user/login','/user/register']
 */
export const NOT_AUTHENTICATION_ROUTES: string[] = [] 

/* API地址 */
export const ORIGIN = 'XXXX';
/* 默认地址 */
export const API_URL = `${ORIGIN}/admin`;
/* 管理员默认地址 */
export const ADMIN_URL = `${ORIGIN}/admin`;
/* 保存用户信息KEY */
export const KEY_USER_TOKEN = '__USER_TOKEN__';