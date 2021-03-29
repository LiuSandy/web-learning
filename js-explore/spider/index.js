const axios = require('axios').default;
const path = require('path');
const fs = require('fs');


const BASE_URL = "https://unsplash.com/napi/search/photos?query=food&per_page=20&page=2&xp=";


axios.get(BASE_URL).then(response => {
  const data = response.data
  const results = data.results
  results.forEach(result => {
    // 图片的链接 返回是一个二进制
    const url = result.links.download
    // 图片的ID
    const id = result.id
    // 请求图片的URL 保存至文件夹
    axios.get(url, {
      responseType: 'arraybuffer'
    })
      .then(res => {
        const buffer = Buffer.from(res.data, 'binart')
        fs.writeFileSync(path.resolve(__dirname, `./unsplash/${id}`), buffer)
      })
  })
})
