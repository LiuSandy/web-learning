const ENDPOINT = "http://localhost:8080"

function baseRequest(options) {
  const url = options.url ?? "/"
  return fetch(`${ENDPOINT}${url.startsWith('/') ? url : `/${url}`}`, {
    method: options.method ?? 'get',
    credentials: 'include',
    // 合并 headers
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, options.headers ?? {}),
    body: options.method === 'get' ? null : JSON.stringify(options.data),
  })
    .then(response => response.json())
    .then(res => {
      if (res.status == 401) {
        // 需要登录
        return Promise.reject({ msg: res.msg, data: res.data, res })
      }
      if (res.status === 200 || res.status === 0) {
        return Promise.resolve(res)
      }
      // 通用的 toast 提示
      alert(res.msg ?? "发送失败")
      return Promise.reject({ msg: res.msg, data: res.data, res })
    })
}

const request = ['get', 'post'].reduce((req, method) => {
  req[method] = (url, data = {}, options) => {
    return baseRequest(Object.assign({ url, method, data }, options))
  }
  return req
}, {})


document.getElementById("login").addEventListener('click', () => {
  request.post('/api/login', { username: "admin", password: "admin" })
    .then(res => {
      console.log(res)
    })

})

document.getElementById("request").addEventListener('click', () => {
  request.get('/api/json')
    .then(res => {
      console.log(res);
    })

})


