const Router = require("koa-router");
const network = new Router();
const bodyParser = require("koa-bodyparser");
const multer = require("@koa/multer");
const path = require("path");
const fs = require("fs");
const article = require("../utils/sql");

network.use(bodyParser());

// 获取所有network的数据
network.get("/fileList", async (ctx) => {
    const data = await article.getFile();
    ctx.body = data;
});

// 搜索
network.post("/search", async (ctx) => {
    const {params} = ctx.request.body;
    const keyword = params;
    console.log(keyword);
    const data = await article.search(keyword);
    ctx.body = data;
});

// 文件上传
const storage = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/overUploads"));
    },
    // 修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({storage});

network.post("/upload", upload.single("file"), async (ctx) => {
    const {filename, originalname} = ctx.request.file;
    let hz = originalname.split('.')
    let filenames = '/public/overUploads/' + filename
    // 获取token中的username
    let username = ctx.state.user.username
    const data = await article.addFile(username, filenames);
    ctx.body = data;
});

module.exports = network;
