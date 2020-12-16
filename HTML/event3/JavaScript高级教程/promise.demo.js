const promiseCreator = function (type, time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(type)
    }, time);
  })
}

const promise = promiseCreator("ID");

promise
  .then(res => {
    console.log(res);
    return promiseCreator("name", 5000)
  })
  .then(res2 => {
    console.log("res2", res2);
    return promiseCreator(res2, 1000)
  })
  .then(res3 => {
    console.log("res3", res3);
  })