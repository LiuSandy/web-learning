const Koa = require('koa');
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = "Hello World!"
  await next()
}).post('/users', async (ctx, next) => {
  console.log("ctx",ctx);
  
  ctx.body = "新增用户";
}).put('/users/:id', async (ctx, next) => {
  ctx.body = "修改对应IDde用户";
}).del('/users/:id', async (ctx, next) => {
  ctx.body = "删除对应IDde用户";
}).all('/', async (ctx, next) => {
  ctx.body = "执行了 All";
  console.log("match 'all' method");
  await next()
})

app.use(router.routes())

app.listen(4000, () => {
  console.log("server is runing at http://127.0.0.1:4000");
})