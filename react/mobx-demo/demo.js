const { stringify } = require('query-string')

const obj = { a: undefined, b: null, c: 12 }
const result = stringify(obj, { skipNull: false, skipEmptyString: false })


console.log(result)