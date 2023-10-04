const Router = require("koa-router");
const hall = new Router();
const myHall = new Router();
const article = require("../utils/sql")
const bodyParser = require("koa-bodyparser");
myHall.use(bodyParser());
// 获取任务列表
hall.get("/", async (ctx) => {
    let data = await article.getHallList();
    ctx.body = data
});
hall.get("/list", async (ctx) => {
    let data = await article.getHalls();
    ctx.body = data
});

//获取接取的任务
myHall.post("/", async (ctx) => {
    let params =ctx.request.body
    let {id} = params
    console.log(id)
    let data = await article.getMyHall(id);
    ctx.body = data
});

module.exports = {hall, myHall};
