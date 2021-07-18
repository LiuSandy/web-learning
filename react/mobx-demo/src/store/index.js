import {
  observable
} from 'mobx'

class AppStore {
  @observable inputValue = "XXX"
  @observable list = ["早8点开晨会", "早9点开晨会,需求沟通会", "早8点开晨会", "早8点开晨会"]
}

const appStore = new AppStore

export default appStore