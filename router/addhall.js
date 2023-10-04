const Router = require("koa-router");
const addhall = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
addhall.use(bodyParser());

// 注册接口
addhall.post("/", async (ctx) => {
    const params = ctx.request.body;
    let data = await article.addhall(params);
    ctx.body =data
});


module.exports = addhall;
