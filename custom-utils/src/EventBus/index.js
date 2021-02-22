export const eventBus = {
  callback: {

  }
}

eventBus.on = function (name, callback) {
  if (this.callback[name]) {
    this.callback[name].push[callback]
  } else {
    this.callback[name] = [callback]
  }
}

eventBus.emit = function (name, data) {
  if (this.callback[name]) {
    this.callback[name].forEach(fn => fn(data))
  }
}

eventBus.off = function (name) {
  if (this.callback[name]) {
    delete this.callback[name]
  } else {
    this.callback = {}
  }
}