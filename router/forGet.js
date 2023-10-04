const Router = require("koa-router");
const forget = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
forget.use(bodyParser());

// 修改账号接口
forget.post("/", async (ctx) => {
    const params = ctx.request.body;
    const {username, password, iphone} = params;
    console.log(username, password, iphone);
    let data = await article.forgetUser(username, password, iphone);
    ctx.body =data
});

module.exports = forget;
