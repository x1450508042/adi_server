const Router = require("koa-router");
const userInfo = new Router();
const article = require("../utils/sql")
const bodyParser = require("koa-bodyparser");
userInfo.use(bodyParser());
// 获取登录用户的信息
userInfo.get("/", async (ctx) => {
    // 获取token中的username
    let username = ctx.state.user.username
    let data = await article.getUserInfo(username);
    ctx.body = data
});
//获取所有账号 管理员
userInfo.get("/roleInfo", async (ctx) => {
    // 获取token中的username
    let data = await article.getroleInfo();
    ctx.body = data
});
//修改账号信息
userInfo.post("/settingRole", async (ctx) => {
    let params =ctx.request.body
    let data = await article.settinguser(params);
    ctx.body = data
});

module.exports = userInfo;
