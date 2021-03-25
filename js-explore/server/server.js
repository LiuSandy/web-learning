const express = require("express")
const bodyPreser = require('body-parser')
const cookiePreser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(bodyPreser.json())
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))
app.use(cookiePreser())


app.get('/', (req, res) => {
  res.send("Hello World")
})

app.post("/api/login", (req, res) => {
  const { username, password } = req.body

  res.cookie("loginToken", username, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
  })
  res.json({
    status: 0,
    msg: '登录成功',
    data: username
  })
})

app.get("/api/json", (req, res) => {
  const {loginToken} = req.cookies
  res.json({
    status: 0,
    loginToken
  })
})

app.listen(8080, () => {
  console.log("server start at http://localhost:8080");
})