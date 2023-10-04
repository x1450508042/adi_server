const Koa = require("koa2");
const app = new Koa();
const router = require("./router/index");
const cors = require("koa2-cors");
const koajwt = require("koa-jwt");
const path = require("path");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");

const errorHandler = require("./utils/errorHandler.js");
const response = require("./utils/response");
const port = 4143;
const assetsDir = path.join(__dirname, "/assets");
const secret = "xym...";

// 处理跨域请求
app.use(cors());

// 处理静态资源文件夹
app.use(static(assetsDir));
app.use(static(path.join(assetsDir, "images")));
// 设置静态文件目录
app.use(static("./public"));

// 处理HTTP方法以及Access-Control-Allow相关内容
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});
// 使用body-parser中间件处理请求体
app.use(
  bodyParser({
    multipart: true,
  })
);

//需要token鉴权的路由，如果没有携带token，自定义401错误处理，表示没有权限
app.use(function(ctx,next){
  return next().catch((err)=>{
    if(401 == err.status){
      ctx.status = 401
      ctx.body =response.fail('token已过期',401)
    }else{
      throw err
    }
  })
})

// 拦截需要JWT验证的请求 koa-jwt会自动解析token 并放到ctx.state.user里
app.use(
  koajwt({
    secret,
  }).unless({
    //表示除了路由以/login，reg，开头的不需要token鉴权，其他路由都需要  /^\/network/
    path: [/^\/login/, /^\/reg/, /^\/forget/],
  })
);

// 注册路由并统一异常处理
app.use(router.routes(), router.allowedMethods());
errorHandler(app);

// 启动服务器
app.listen(port, () => {
  console.log(`服务开启: http://127.0.0.1:${port}`);
});
