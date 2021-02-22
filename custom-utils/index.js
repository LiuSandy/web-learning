export function test() {
  document.write("XXXX")
  console.log("XXX");
}

export {
  map,
  reduce,
  filter,
  find,
  findIndex,
  some,
  every,
  unique,
  uniqueByObject,
  uniqueBySet,
  concat,
  slice,
  flatter,
  chunk,
  difference,
  pull,
  pullAll,
  drop, dropRight,
} from './src/Array'

export {
  call,
  apply,
  bind,
  throttle,
  debounce,
} from './src/Function'

export { newInstance, myInstanceOf, merge, clone, cloneDeep } from './src/Object'

export {
  reverse,
  palindrome,
  truncate
} from './src/String'

export {axios} from './src/Axios'

export {addEventListener} from './src/Event/eventBind'

export {eventBus} from './src/EventBus'

export {PubSub} from './src/Pubsub'