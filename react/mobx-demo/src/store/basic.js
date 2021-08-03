import { action, observable } from 'mobx';
import { delay } from 'lodash'

export default class BasicStore {
  @observable storeLoading = observable.map({});

  @action
  changeLoadingStatus(loadingType, type) {
    this.storeLoading.set(loadingType, type);
  }
}

// 暴露 initLoading 方法
export function initLoading() {
  return function (
    target,
    propertyKey,
    descriptor,
  ) {
    const oldValue = descriptor.value;
    console.log("---->", descriptor.value.toString())
    descriptor.value = async function (...args) {
      debugger
      let res;
      this.changeLoadingStatus(propertyKey, true); // 请求前设置loading为true
      delay(async () => {
        try {
          res = await oldValue.apply(this, args);
        } catch (error) {
          // 做一些错误上报之类的处理 
          throw error;
        } finally {
          this.changeLoadingStatus(propertyKey, false); // 请求完成后设置loading为false
        }
      }, 2000, 'later')
      return res;
    };
    console.log("---->", descriptor.value.toString())

    return descriptor;
  };
}
