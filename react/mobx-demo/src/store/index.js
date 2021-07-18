import {
  observable,
  action
} from 'mobx'

class AppStore {
  @observable inputValue = "XXX"
  @observable list = ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"]

  @action handleInputChange(value) {
    this.inputValue = value
  }

  @action handleAddTodos(todo) {
    this.list.push(todo)
  }

  @action handleDeleteTodos(index) {
    this.list.splice(index, 1)
  }
}

const appStore = new AppStore()

export default appStore