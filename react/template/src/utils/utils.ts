/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

// Flatten treelike array, 扁平化 树状数组
// (TreeLike, String key) -> [key1, key2, key3, ...]
export type TreeLike<T> = T & {
  children?: TreeLike<T>[];
};

export const traverseTree = <T>(tree: TreeLike<T>[], fn: (item: T) => any, acc: any[] = []) => {
  let result: any[] = acc;
  // eslint-disable-next-line no-restricted-syntax
  for (const ele of tree) {
    // FIXME: Use more percise way?
    result = result.concat(fn(ele));

    if (Array.isArray(ele.children) && ele.children.length) {
      result = traverseTree(ele.children, fn, result);
    }
  }
  return result;
};

export const traverseTreeMap = <T>(tree: TreeLike<T>[], fn: (el: T) => any) => {
  let result: any[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const ele of tree) {
    const newEle = fn(ele);
    result = result.concat(newEle);

    if (Array.isArray(ele.children) && ele.children.length) {
      newEle.children = traverseTreeMap(ele.children, fn);
    }
  }

  return result;
};

export const traverseTreeFilter = <T, R extends TreeLike<T>>(
  tree: TreeLike<T>[],
  predicate: (el: T) => boolean,
) => {
  let result: R[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const ele of tree) {
    // shallow copy one level
    const newEle = { ...ele };
    const condition = predicate(newEle);

    if (condition) {
      result = result.concat(newEle as any);

      if (Array.isArray(ele.children) && ele.children.length) {
        newEle.children = traverseTreeFilter(ele.children, predicate);
      }
    }
  }

  return result;
};

export const traverseTreeFind = <T>(
  tree: TreeLike<T>[],
  predicate: (el: T) => boolean,
): null | T => {
  let result = null;

  // eslint-disable-next-line no-restricted-syntax
  for (const ele of tree) {
    if (predicate(ele)) return ele;

    if (Array.isArray(ele.children) && ele.children.length) {
      // eslint-disable-next-line no-cond-assign
      if ((result = traverseTreeFind(ele.children, predicate))) {
        return result;
      }
    }
  }

  return result;
};

export const logTree = <T>(tree: TreeLike<T>[]): void => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tree.length; i++) {
    const ele = tree[i];
    // eslint-disable-next-line no-console
    console.log(ele);

    if (Array.isArray(ele.children) && ele.children.length) {
      logTree(ele.children);
    }
  }
};
