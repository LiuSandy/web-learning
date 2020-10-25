function func(args) {
  return ({ name }) => next => action => {
    console.log(">>>", name, action);
    return next()
  }
}
