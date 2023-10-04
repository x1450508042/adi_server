const Router = require("koa-router");
const reg = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
reg.use(bodyParser());

// 注册接口
reg.post("/", async (ctx) => {
    const params = ctx.request.body;
    let data = await article.register(params);
    ctx.body =data
});

module.exports = reg;
