/**
 * Route 根据 path 匹配 需要渲染的内容
 */
import React, { useContext } from 'react'
import RouteContext from './routeContext'
import { pathToRegexp } from "path-to-regexp";

const Route = (props) => {
  const context = useContext(RouteContext)
  const computedPath = (path, exact) => {
    const pathname = context.location.pathname;
    const keys = [];
    const regexp = pathToRegexp(path, keys, {
      end: exact,
      strict: false,
      sensitive: false
    });
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;
    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }
  // eslint-disable-next-line no-unused-vars
  const { render, children, component, path, exact = false, ...rest } = props
  const match = computedPath(path, exact)
  const params = { ...context, match, location: context.location }
  if (match) {
    if (children) {
      if (typeof children === 'function') {
        return children(params)
      }
      return React.cloneElement(children, params)
    } else if (component) {
      return component(params)
    } else if (render) {
      return render(params)
    }
  }

  return null
}

export default Route
