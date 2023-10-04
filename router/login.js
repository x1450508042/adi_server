const Router = require("koa-router");
const login = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
login.use(bodyParser());


// 登录
login.post("/", async (ctx) => {
    const params = ctx.request.body;
    const { username, password } = params;
    let data = await article.login(username, password);
    ctx.body = data;
});




module.exports = login;



