
import { createContext } from 'react'
import {
  makeAutoObservable,
  observable,
  action,
  makeObservable
} from 'mobx'

class App {
  secondsPassed = 0;
  list = [1, 2, 3];

  constructor() {
    makeAutoObservable(this);
  }

  get total() {
    this.list = []
    return this.list.length
  }

  increaseTimer = () => {
    console.log("-->", this);
    this.secondsPassed += 1;
  };

  onClick = () => {
    console.log(this);
    this.secondsPassed = 12;
    this.list.push('12');
  };
}

export const app = new App();
export const AppContext = createContext();