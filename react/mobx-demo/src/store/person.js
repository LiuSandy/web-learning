import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx'

class Person {
  firstName = "a";
  lastName = "b";
  nickName;

  constructor() {
    makeAutoObservable(this)
  }

  get fullName() {
    return this.firstName + " " + this.lastName;
  }

  changeFirstName() {
    this.firstName = "XXXXX"
  }
}

export default new Person()
