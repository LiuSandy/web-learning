const map = require('./map')
const reduce = require('./reduce');
const filter = require('./filter');
const find = require('./find')
const findIndex = require('./findIndex')
const every = require('./every')
const some = require('./some')
const unique = require('./unique');
const uniqueByObject = require('./uniqueByObject')
const uniqueBySet = require('./uniqueBySet')
const concat = require('./concat')
const slice = require('./slice')
const flatter = require('./flatter')
const chunk = require('./chunk')
const difference = require('./difference')
const pull = require('./pull')
const pullAll = require('./pullAll')
const { drop, dropRight } = require('./drop')

module.exports = {
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
}