const Router = require("koa-router");
const loginOut = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
loginOut.use(bodyParser());

// 登录
loginOut.post("/", async (ctx) => {
    let params =ctx.request.body
    const { username } = params;
    let data = await article.loginOuts(username);
    ctx.body = data;
});




module.exports = loginOut;



