const pluginName = 'ModuleBuildTimeCalWebpackPlugin';

class FileListPlugin {

  constructor(options = {}) {
    this.options = options
    this.modules = {}
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.buildModule.tap(pluginName, module => {
        const { userRequest, loaders } = module
        const name = userRequest.replace(process.cwd(), '');
        if (!name.includes("node_modules")) {
          this.modules[name] = {
            start: (new Date()).getTime(),
            // loaders,
            name,
          }
        }
      })
      compilation.hooks.succeedModule.tap(pluginName, module => {
        const { userRequest } = module
        const name = userRequest.replace(process.cwd(), '')
        if (!name.includes('node_modules') && !!this.modules[name]) {
          this.modules[name].end = (new Date()).getTime()
          const use = this.modules[name].end - this.modules[name].start
          this.modules[name].end = use
        }
      })
      compilation.hooks.finishModules.tap(pluginName, () => {
        const modules = JSON.stringify(this.modules);
        // process.stdout.write(modules)
        console.log('\x1b[36m%s\x1b[0m', modules);  
      })
    })
  }
}

module.exports = { FileListPlugin };