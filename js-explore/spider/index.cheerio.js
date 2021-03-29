const axios = require("axios").default;
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')

const BASE_URL = "https://www.bigbigwork.com/tupian/shu49_1.html"

axios.get(BASE_URL)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const $imgs = $('#items img')
    const result = $imgs.map((index, img) => {
      const imgUrl = $(img).attr("src")
      const url = imgUrl.split('?')[0];
      const id = url.split('/').pop();
      return axios.get(imgUrl, {
        headers: {
          "headers": {
            "accept": "image/webp,image/apng,image/*,*/*;q=0.8",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "image",
            "sec-fetch-mode": "no-cors",
            "sec-fetch-site": "cross-site",
            "authority": "simg3.bigurl.ink",
            "referer": "https://www.bigbigwork.com/tupian/test.html",
            'method': 'GET',
            'path': '/jin/c0051440a91011e90c7d713b49da0385.jpg?x-oss-process=style/pc_236_webp_2x',
            'scheme': 'https',
            "mode": "cors"
          },
          responseType: 'arraybuffer'
        }
      })
        .then(res => {
          console.log("---", res)
          const buffer = Buffer.from(res.data, 'binart')
          fs.writeFileSync(path.resolve(__dirname, `./bigbigwork/${id}`), buffer)
        })
    })

  })

// fetch("https://simg3.bigurl.ink/jpi2/c86285b93d54705d9bb4b04408abe7c4.jpg?x-oss-process=style/pc_236_webp", {
//   "headers": {
//     "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "image",
//     "sec-fetch-mode": "no-cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "https://www.bigbigwork.com/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors"
// });
