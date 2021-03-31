const Duplex = require('stream').Duplex

const duplex = Duplex()

duplex._read = function () {
  this._random = this._random || 0
  if (this._random > 1) {
    this.push(null)
  } else {
    this.push(`${this._random++}`)
  }

}

duplex._write = function (data, err, next) {
  process.stdout.write(`_write data ${data.toString()}\n`)
  next()
}

duplex.on('data', data => { process.stdout.write(`ondata = ${data.toString()}\n`) })

duplex.write('a')
duplex.write('b')
duplex.write('c')
duplex.write('d')
duplex.write('e')

duplex.end()
