const Router = require("koa-router");
const fetchs = new Router();
const bodyParser = require("koa-bodyparser");
const article = require("../utils/sql")
fetchs.use(bodyParser());

fetchs.post("/", async (ctx) => {
    const params = ctx.request.body;
    let data = await article.fetchHall(params);
    ctx.body =data
});
fetchs.post("/setfetch",async(ctx)=>{
    const params =ctx.request.body
    let data =await article.setfetch(params[0])
    ctx.body =data
})

module.exports = fetchs;
