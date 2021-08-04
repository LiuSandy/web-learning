const { makeAutoObservable, autorun, trace } = require('mobx')

class Message {
  title
  author
  likes
  constructor(title, author, likes) {
    makeAutoObservable(this)
    this.title = title
    this.author = author
    this.likes = likes
  }

  updateTitle(title) {
    this.title = title
  }
}

let message = new Message("Foo", { name: "Michel" }, ["Joe", "Sara"])
autorun(() => {
  console.log(message.likes)
})
message.likes.push("Jennifer")