const Router = require("koa-router");
const getHall = new Router();
const getUserHall =new Router()
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
getHall.use(bodyParser());
getUserHall.use(bodyParser())
// 获取任务列表
getHall.post("/", async (ctx) => {
    const username = ctx.state.user.username;
    let data = await article.getHall(username);
    ctx.body =data
});
//获取已完成的任务
getHall.get("/lists", async (ctx) => {
    let data = await article.getHallll();
    ctx.body =data
});
//获取正在接取的任务
getUserHall.post("/",async (ctx)=>{
    const username = ctx.state.user.username;

    let data =await article.getuserhall(username);
    ctx.body =data
})

module.exports = {getHall,getUserHall};
