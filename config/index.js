const path = require('path')
const fs = require('fs')
require('dotenv').config()

const appDirectory = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  base: {
    appNodeModules: resolve('node_modules'),
    yarnLockFile: resolve('yarn.lock'),
    appPackageJson: resolve('package.json')
  },
  dev: {
    appHtml: resolve('public/index.html'),
    entryPath: resolve('docs-src'),
    entry: resolve('docs-src/index.js'),
    appPublic: resolve('public'),
    autoOpenBrowser: false,
    outputPath: resolve('docs'),
    assetsPublicPath: '/',
    sourceMap: true
  },
  pack: {
    entryPath: resolve('src'),
    entry: resolve('src/index.js'),
    outputPath: resolve('dist'),
    filename: 'index.js',
    // library: 'jQuery',
    libraryTarget: 'umd',
    // 暴露指定模块，空表示暴露 module.exports
    libraryExport: '',
    umdNamedDefine: true,
    sourceMap: true
  }
}
