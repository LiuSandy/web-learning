import { makeAutoObservable } from "mobx";

class newStore {
  inputValue = "222"
  list = ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"]

  constructor() {
    makeAutoObservable(this)
  }

  handleInputChange(value) {
    this.inputValue = value
  }
  handleAddTodos(todo) {
    this.list = [...this.list, todo]
  }
  handleDeleteTodos(index) {
    this.list.splice(index, 1)
  }
}

const myStore = new newStore()

export default myStore