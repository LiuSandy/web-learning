const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

let ID = 0

// 读取单个文件内容提取依赖关系
function createAsset(filename) {
  // 以字符串形式读取
  const content = fs.readFileSync(filename, "utf-8");
  // 读取依赖关系，把内容转化为抽象语法树(AST)
  const ast = babylon.parse(content, { sourceType: "module" })
  // 定义数组保存模块依赖
  const dependencies = [];
  // 遍历AST 检查模块间依赖
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    }
  })
  // 为模块分配唯一标识符
  const id = ID++
  // 使用 babel 进行语法转换
  const { code } = transformFromAst(ast, null, {
    presets: ['babel-preset-env']
  })

  return {
    id,
    code,
    dependencies,
    filename
  }
}

// 分析文件间的依赖关系
function createGraph(entry) {
  // 解析入口文件
  const mainAsset = createAsset(entry)
  // 定义数组保存依赖关系
  const queue = [mainAsset]
  // 循环查找文件中的依赖
  for (const asset of queue) {
    asset.mapping = {}
    const dirname = path.dirname(asset.filename)
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      // 读取依赖关系
      const child = createAsset(absolutePath)
      // 对应ID
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}

// 开始打包
function bundle(graph,output) {
  let modules = ""
  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require,module,exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`
  })
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

    fs.writeFileSync(output,result)
}

const fileName = path.resolve(__dirname, './entry.js')
bundle(createGraph(fileName),'./output.js')