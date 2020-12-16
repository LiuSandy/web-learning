// var promise1 = new Promise((resolve,
//   reject) => { reject(); });

// const promise2 = promise1
//   .then(null, function () {
//     return 123
//   });

// promise2
//   .then(
//     (x) => {
//       console.log('promise2 已完成', x);
//     },
//     () => {
//       console.log('promise2 已拒绝');
//     });

class CustomPromise {
  constructor(handleFunc) {
    this.state = "pending";
    this.value = undefined;

    this.fulfilledList = [];

    handleFunc(this.triggerResolve.bind(this))
  }

  triggerResolve(val) {
    setTimeout(() => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled';
      this.value = val;
      this.fulfilledList.forEach(item => item(val))
      this.fulfilledList = []
    }, 0);
  }

  then(onFulfilled, onRejected) {
    const { state, value } = this;
    const promiseInstance = new CustomPromise((onNextFullfilled, onNextRejected) => {
      function onFinalFulfilled(val) {
        if (typeof onFulfilled !== 'function') {
          onNextFullfilled(val)
        } else {
          const res = onFulfilled(val)
          if (res && typeof res.then === 'function') {
            res.then(onNextFullfilled)
          } else {
            onNextFullfilled(res)
          }
        }
      }

      switch (state) {
        case 'pending':
          this.fulfilledList.push(onFinalFulfilled);
          break;
      }
    })

    return promiseInstance
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static all(list) {
    return new CustomPromise((resolve, reject) => {
      let count = 0;
      const values = []
      for (const [i, customPromiseInstance] of list.entries()) {
        customPromiseInstance
          .then(
            res => {
              values[i] = res;
              count++;
              if (count === list.length) resolve(values)
            },
            err => {
              reject(err)
            }
          )
      }
    })
  }

  static resole(val) {
    return new CustomPromise((resolve, reject) => {
      resolve(val)
    })
  }

}

const createPromise = function (time) {
  return new CustomPromise(function (resolve, reject) {
    return setTimeout(resolve, time)
  })
}

const promiseInstance = createPromise(1000)

promiseInstance.then(function () {
  console.log("hello world");
})