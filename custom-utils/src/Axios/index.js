export function axios({ method, url, params, data }) {
  // 请求类型归一化
  method = method.toUpperCase()
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    // 1. 创建对象
    const xhr = new XMLHttpRequest();
    // 2. 初始化，添加方法和URL
    // 先对params对象进行url的拼接
    let str = "?"
    for (const key in params) {
      str += `${key}=${params[key]}&`
    }
    xhr.open(method, url + str)
    // 删除多余的&
    str = str.slice(0, -1)
    // 3. 根据请求方式设置请求体
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      // 设置Content-type mine 类型
      xhr.setRequestHeader("Content-type", 'application/json');
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }

    // 设置响应结果是一个JSON格式
    xhr.responseType = 'json'

    // 4. 监听XHR响应
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // 请求成功
          resolve({
            status: xhr.status,
            message: xhr.statusText,
            body: xhr.response
          })
        } else {
          reject(new Error(`请求失败，状态为${xhr.status}`))
        }
      }
    }
  })
}

axios.get = function (url, options) {
  return axios(Object.assign(options, { method: "GET", url }))
}

axios.post = function (url, options) {
  return axios(Object.assign(options, { method: "post", url }))
}

axios.put = function (url, options) {
  return axios(Object.assign(options, { method: "put", url }))
}

axios.delete = function (url, options) {
  return axios(Object.assign(options, { method: "delete", url }))
}

