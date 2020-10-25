const Koa = require('koa');
const Router = require("koa-router");
var bodyParser = require('koa-bodyparser');
const { sign } = require('jsonwebtoken');
const secret = 'lius';
const jwt = require('koa-jwt')({ secret });

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const admin = async (ctx, next) => {
  if (ctx.state.user.username === 'admin') {
    next()
  } else {
    ctx.body = {
      code: -1,
      message: 'Authentication Error'
    }
  }
}

router.post("/api/login", async (ctx, next) => {
  const user = ctx.request.body
  console.log("user>>>>>", ctx.request.body);
  
  if (user && user.username) {
    const { username } = user;
    const token = sign({ username }, secret, { expiresIn: '1h' });
    ctx.body = {
      message: 'Get Token Success',
      code: 1,
      token
    };
  } else {
    ctx.body = {
      message: 'Param Error',
      code: '-1'
    }
  }
}).get('/api/userInfo', jwt, async ctx => {
  ctx.body = { username: ctx.state.user.username };
}).get('/api/adminInfo', jwt, admin, async ctx => {
  ctx.body = { username: ctx.state.user.username };
})

app.use(router.routes())
app.listen(4000, () => {
  console.log("server is runing at http://127.0.0.1:4000");
})