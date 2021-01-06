const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const Router = require("koa-router");

const app = new Koa();
app.use(bodyParser());
app.use(cors());
const router = new Router();

router.get('/user', async (ctx, next) => {
  console.log("这里")
  ctx.body = "Hello World!"
  await next()
}).post('/users', async (ctx, next) => {
  console.log("ctx",ctx.query);
  
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

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

app.listen(4000, () => {
  console.log("server is runing at http://127.0.0.1:4000");
})