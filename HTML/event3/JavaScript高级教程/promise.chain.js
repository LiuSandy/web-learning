function promiseCreator(val, time) {
  return new Promise(resolve => {
    setTimeout(resolve(val), time);
  })
}

function promiseCreator2(val, time) {
  return new Promise(resolve => {
    setTimeout(resolve(val), time);
  })
}

const promiseCreatorList = [
  promiseCreator,
  promiseCreator2,
];

const promiseChain = promiseList =>
  promiseList
    .reduce((acc, cur, index) =>
      acc
        .then(x => cur(`这是第${index}个promis;上一个值为=>${x}`, (index + 1) * 1000)),
      Promise.resolve(0)
    )

// index 0 => 这是第0个promis;上一个值为 0
// index 1 => 这是第1个promis;上一个值为 这是第0个promis;上一个值为 0

promiseChain(promiseCreatorList).then(res => console.log(res))

const promiseChain2 = promiseList => {
  let result = Promise.resolve(0)
  for (const [index, promise] of promiseList.entries()) {
    result = result.then(x => promise(`这是第${index}个promis;上一个值为=>${x}`, (index + 1) * 1000))
  }
  return result
}

promiseChain2(promiseCreatorList).then(res => console.log(res))

// awaite
async function main(promiseCreatorList) {
  async function forOfLoop() {
    for (const iterator of promiseCreatorList) {
      await iterator()
    }
  }
  await forOfLoop()
}