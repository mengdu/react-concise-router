/**
* @param {string} path 路径
* @return {string} 返回连接路径
**/
export function reslove () {
  let paths = []
  for (let i in arguments) {
    paths.push(arguments[i].replace(/^\s*|\s*$/g, '').replace(/^\//, ''))
  }
  return paths.join('/')
}

/**
* 编译字符串 :var
* @param {string} tpl
* @return {function} 返回函数
**/
export function compileString (tpl) {
  let expression = tpl.replace(/('|"|\\)/g, '\\$1')
    .replace(/:(\w+)/g, function (txt, key) {
      return '\' + data[\'' + key + '\'] + \''
    })
  /*eslint no-new-func: "off"*/
  return new Function('data', 'return (\'' + expression + '\')')
}

export function objectToQueryString (obj) {
  let qs = []
  for (let key in obj) {
    qs.push(`${key}=${encodeURIComponent(obj[key])}`)
  }

  return qs.join('&')
}
