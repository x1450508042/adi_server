const Router = require("koa-router");
const router = new Router();

const login = require("./login");
const reg = require("./reg");
const network = require("./network");
const userInfo=require('./userInfo')
const forget=require('./forGet')
const halls=require('./hall')
const loginout = require('./loginOut')
const fetchs =require('./fetchhall')
const getHalls =require('./getHall')
const addhall =require('./addhall')

router.use("/login", login.routes(), login.allowedMethods());
router.use("/reg", reg.routes(), reg.allowedMethods());
router.use("/userInfo", userInfo.routes(), userInfo.allowedMethods());
router.use("/network", network.routes(), network.allowedMethods());
router.use("/forget", forget.routes(), forget.allowedMethods());
router.use("/hall", halls.hall.routes(), halls.hall.allowedMethods())
router.use("/hall/myHall", halls.myHall.routes(), halls.myHall.allowedMethods())
router.use("/loginout", loginout.routes(), loginout.allowedMethods())
router.use("/fetchs", fetchs.routes(), fetchs.allowedMethods())
router.use("/getHall", getHalls.getHall.routes(), getHalls.getHall.allowedMethods())
router.use("/getHall/userhall", getHalls.getUserHall.routes(), getHalls.getUserHall.allowedMethods())
router.use("/addhall", addhall.routes(), addhall.allowedMethods())






// router.redirect("/", "/home");

module.exports = router;
