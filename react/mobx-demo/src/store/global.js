import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx'

class Global {
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  changeLoadingState() {
    this.loading = !this.loading
  }
}

export default new Global()
