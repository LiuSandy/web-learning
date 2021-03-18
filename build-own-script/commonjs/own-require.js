/**
 * commonjs 规范简版
 */
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function ownRequire(filename) {
  const filePath = path.resolve(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf-8')
  const wrappedContent = `(function(require,moudle,exports,__name){
    ${content}
  })`
  // 使用沙箱执行代码
  const moudle = {
    exports: {}
  }

  const script = new vm.Script(wrappedContent, {
    filename: 'index.js'
  })

  const result = script.runInThisContext()
  result(ownRequire, moudle, moudle.exports,"Lius")

  return moudle.exports
}

global.r = ownRequire