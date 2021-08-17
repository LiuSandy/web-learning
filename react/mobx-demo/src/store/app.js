
import { createContext } from 'react'
import {
  makeAutoObservable,
  observable,
  action,
  makeObservable,
  runInAction
} from 'mobx'

const delay = (wait) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("hello"), wait)
  })
}

class App {
  secondsPassed = 0;
  list = [1, 2, 3];

  constructor() {
    // makeAutoObservable(this, {
    //   changeListValue: action.bound
    // });
    makeAutoObservable(this);
  }

  get total() {
    console.log("Computing...", this)
    return this.list.length
  }

  increaseTimer() {
    this.secondsPassed += 1;
  };

  onClick() {
    console.log(this);
    this.secondsPassed = 12;
    this.list.push('12');
  }

  changeListValue() {
    console.log(this)
    this.list[0] = 89
  }

  changeListLength() {
    console.log("not Bound", this)
    this.list.push("XXX")
  }


  * fetchList() {
    console.log("async start", this)
    const res = yield delay(2000)
    runInAction(() => {
      console.log('this', this)
    })
    console.log("async end", res)
    return res
  }
}

export const app = new App();
export const AppContext = createContext();