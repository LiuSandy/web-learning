// const promise = val => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve(val), 1000)
//   })
// }


// const promise2 = promise("XXX").then(reason => {
//   console.log(reason);
//   return {

//   }
// })

// promise2.then(reason=>{
//   console.log("promise2", reason);
// })

class CustomPromise {
  constructor(handleFunc) {
    this.state = "pending";
    this.value = undefined;

    this.fulfilledList = [];
    this.rejectList = [];

    handleFunc(
      this.triggerResolve.bind(this),
      this.triggerReject.bind(this)
    )
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

  triggerReject(val) {
    setTimeout(() => {
      if (this.state !== 'pending') return
      this.state = 'reject';
      this.value = val;
      this.rejectList.forEach(item => item(val))
      this.rejectList = []
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

      function onFinalRejected(val) {
        if (typeof onRejected !== 'function') {
          onNextRejected(val)
        } else {
          const res = onRejected(val);
          if (res && typeof res.then === 'function') {
            res.then(null, onNextFullfilled)
          } else {
            onNextRejected(res)
          }
        }
      }

      switch (state) {
        case 'pending':
          this.fulfilledList.push(onFinalFulfilled);
          this.rejectList.push(onFinalRejected);
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
    return setTimeout(() => resolve("XXX"), time)
  })
}

const createPromiseReject = function (time) {
  return new CustomPromise(function (resolve, reject) {
    return setTimeout(() => reject("YYY"), time)
  })
}

const promiseInstance = createPromise(1000)

const promiseRejectInstance = createPromiseReject(1000)

promiseInstance.then(function (reason) {
  console.log("hello world", reason);
})

promiseRejectInstance.then(function () {
  console.log("已完成")
}, function (err) {
  console.log("已拒绝", err);
})