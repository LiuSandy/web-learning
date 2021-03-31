const Writable = require('stream').Writable

const writable = Writable()

writable._write = function (data, err, next) {
  // 将传入流的数据写入
  process.stdout.write(data.toString().toUpperCase())

  process.nextTick(next)

}

writable.on('finish', () => { process.stdout.write("DONE") })

writable.write('a' + "\n")
writable.write('b' + "\n")
writable.write('c' + "\n")

writable.end()