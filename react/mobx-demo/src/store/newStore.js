import { action, makeAutoObservable, observable } from "mobx";
import BasicStore, { initLoading } from './basic'

class newStore extends BasicStore {
  @observable
  inputValue = "222"
  @observable
  list = ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"]

  @initLoading()
  async handleInputChange(value) {
    this.inputValue = value
  }

  @action
  handleAddTodos(todo) {
    this.list = [...this.list, todo]
  }
  @action
  handleDeleteTodos(index) {
    this.list.splice(index, 1)
  }
}

const myStore = new newStore()

export default myStore