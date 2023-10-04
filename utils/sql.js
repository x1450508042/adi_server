const db = require("./db");
const response = require("./response");
const jwt = require("jsonwebtoken");
const secret = "xym...";

// 登录
async function login(username, password) {
  const sqlLang = `select * from loginuser where username = '${username}' and password = '${password}'`;
  try {
    const data = await db.query(sqlLang);
    if (data.length) {
      if(data[0].status ==1){
        // 更新token
        let token = jwt.sign({ username }, secret, { expiresIn: "1h" });
        let sql = `update loginuser set token = '${token}' where username = '${username}'`;
        let sqlres=await new Promise((resolve,reject)=>{
          return db.query(sql,(err,data)=>{
            if(err) throw err
            resolve({
              username,
              token
            })
          })
        })
        return response.success(sqlres);
      }else{
        return response.fail("账号已被禁用");
      }
    } else {
      return response.fail("用户名或密码错误");
    }
  } catch (err) {
    return response.fail(err.message);
  }
}
// 注册
async function register(params) {
  if(!params.role){
    params.role=1
    //用户可访问的异步路由
    params.router=['dita','userMag','pubmall','minuit']
  }else{
    //管理员可访问的异步路由
    params.router=['userSetting','appeal','extract']

  }
  const sqlLang = `select * from loginuser where username = '${params.username}'`;
  try {
    const data = await db.query(sqlLang);
    if (data.length) {
      return response.fail("用户名已存在");
    } else {
      let sql = `insert into loginuser (username, password,iphone,role,router) values ('${params.username}', '${params.password}','${params.iphone}',${params.role},'${params.router}')`;
     let ress = await  new Promise((resolve,reject)=>{
      return  db.query(sql, async (err, data) => {

         if (err) throw err;
         // 生成token
         let token = jwt.sign({ username:params.username }, secret, { expiresIn: "1h" });
         // 更新token
         let sqll = `update loginuser set token = '${token}' where username = '${params.username}'`;
         let res =await new Promise((resolve,reject)=>{
           return db.query(sqll, (err, data) => {
             if (err) throw err;
             let obj= {
               username:params.username,
               token,
             }
             resolve(obj)
           });
         })
         resolve(res)

       });
     })
      console.log(ress)
      return response.success(ress);
    }
  } catch(err) {
    return response.fail(err.message);
  }
}

// 获取文件列表
async function getFile() {
  const sqlLang = `select * from loginuser`;
  try {
    const data = await db.query(sqlLang);
    return response.success(data);
  } catch (err) {
    return response.fail(err.message);
  }
}

// 搜索
async function search(keyword) {
  const sqlLang = `select * from files where filename like '%${keyword}%'`;
  try {
    const data = await db.query(sqlLang);
    return response.success(data);
  } catch (err) {
    return response.fail(err.message);
  }
}

// 文件上传
async function addFile(username,filename) {
  const sqlLang = `insert into files (user_id,filename) values ('${username}','${filename}')`;
  try {
    const data = await db.query(sqlLang);
    return response.success(filename);
  } catch (err) {
    return response.fail(err.message);
  }
}
async function getUserInfo(username){
  const sqlInfo =`select * from loginuser where username = '${username}'`
  try{
    const data = await db.query(sqlInfo)
    delete data[0].password
    return response.success(data)

  }catch (e) {
    return response.fail(e.message)
  }
}
//获取所有账号
async function getroleInfo(){
  const sqlInfo =`select * from loginuser`
  try{
    const data = await db.query(sqlInfo)
    let user = []
    let userRole =[]
    data.forEach(i=>{
      if(i.role == 1){
        user.push(i)
      }else if(i.role==2 || i.role==3){
        userRole.push(i)
      }
    })
    return response.success({user,userRole})
  }catch (e) {
    return response.fail(e.message)
  }
}

//修改用户的账号为禁用或启用
async function settinguser(params){
  const sql =`update loginuser set status =${params.status} where username='${params.username}'`
  try{
    const data = await db.query(sql)
    return response.success('修改成功')
  }catch (e) {
    return response.fail(e.message)
  }
}




async function forgetUser (username, password, iphone){
  const sql = `select * from loginuser where username='${username}' and iphone='${iphone}'`
  let res = await  new Promise((resolve,reject)=>{
    return db.query(sql,(err,data)=>{
      if(err) throw err;
      if(data.length>0){
        resolve(data)
      }else{
        resolve(false)
      }
    })
  })
  if(res){
    const sqll =`update loginuser set password = '${password}' where username = '${username}'`
    let res2 = await new Promise((resolve,reject)=>{
      return db.query(sqll,(err,data)=>{
        if(err) throw err;
        resolve('修改成功')
      })
    })
    return response.success(res2)
  }else{
    return response.fail('用户名或手机号错误')
  }
}
//获取任务信息
async function getHallList(){
  const sqlhall =`select * from halllist where state = 1`
  try{
    const data = await db.query(sqlhall)
    return response.success(data)
  }catch (e) {
    return response.fail(e.message)
  }
}
//获取所有任务
async function getHalls(){
  const sqlhall =`select * from halllist`
  try{
    const data = await db.query(sqlhall)
    return response.success(data)
  }catch (e) {
    return response.fail(e.message)
  }
}

//获取单独的任务
async function getMyHall(id){
  const sqlhall =`select * from halllist where id =${id}`
  try{
    const data = await db.query(sqlhall)
    return response.success(data)
  }catch (e) {
    return response.fail(e.message)
  }
}

//退出登录
async function loginOuts(username){
  let sql = `update loginuser set token = '0' where username = '${username}'`
  try{
    let res = await new Promise((resolve,reject)=>{
      return db.query(sql ,(err,data)=>{
        if(err) throw err
        resolve('已退出登录')
      })
    })
    return response.success(res)
  } catch (e) {
    return response.fail(e.message)
  }
}

//接取任务
async function fetchHall(val){
  let data = `select * from tasks where username = '${val.username}' and state = 1`
  let res = await new Promise((resolve,reject)=>{
    return db.query(data,async (err,das)=>{
      if(err) throw err
      if(das.length>0){
        resolve(false)
      }else{
        resolve(true)
      }
    })
  })
  if(res){

      let sql = `update halllist set state = '0' where id = '${val.id}'`
      try{
          await db.query(sql)
          let updas = `insert into tasks (title,halltit,username,createtime,deadline,timeLimit,offTime,level,remark,requires,attachmentIds) values ('${val.hallname}',${val.halltit},'${val.username}','${val.dates}','${val.offdate}','${val.limits}','${val.offTime}','${val.rank}','${val.descs}','${val.encode}','${val.attachmentIds}')`
          let updasRes = await new Promise((resolve,reject)=>{
              return db.query(updas,(err,data)=>{
                  if(err) throw err
                  resolve('接取成功')
              })
          })
          return response.success(updasRes)
      }catch (e) {
          return response.fail(e.message)
      }

  }else{
    return response.fail('你已经接取过任务了')
  }

}

//修改接取的任务状态为完成
async function setfetch(params){
  let sql = `update tasks set state = 0 where id =${params.id}`
  try{
    let res =await db.query(sql)
    return response.success('任务完成！')
  }catch (e) {
    return response.fail(e.message)
  }
}

//获取当前用户接取过的所有任务
async function getHall(username){
  let sql =`select * from tasks where username = '${username}'`

  try{
    let res = await db.query(sql)
    return response.success(res)
  }catch (e) {
    return response.fail(e.message)
  }
}
//获取所有任务
async function getHallll(){
  let sql =`select * from tasks where state =0`

  try{
    let res = await db.query(sql)
    return response.success(res)
  }catch (e) {
    return response.fail(e.message)
  }
}

//获取接受的任务
async function getuserhall(username){
  let sql =`select * from tasks where username ='${username}' and state = 1`
  try{
    let res =await db.query(sql)
    return response.success(res)
  }catch (e) {
    return response.fail(e.message)
  }
}

//发布任务
async function addhall(params){
  let sql = `insert into halllist (username,mobile,dates,offdate,hallname,serial,encode,rank,rankId,limits,descs,ask,attachmentIds,quj) values ('${params.username}','${params.mobile}','${params.dates}','${params.offdate}','${params.hallname}','','${params.encode}','${params.rank}','${params.rankId}','${params.limit}','${params.desc}','${params.ask}','${params.attachmentIds}','${params.quj}')`
  try {
    await db.query(sql)
    return response.success('发布成功')
  }catch (e) {
    return response.fail(e.message)
  }
}

module.exports = {
  settinguser,
  getroleInfo,
  getHallll,
  getHalls,
  addhall,
  getMyHall,
  getHall,
  getuserhall,
  fetchHall,
  setfetch,
  loginOuts,
  getHallList,
  forgetUser,
  login,
  register,
  getUserInfo,
  getFile,
  search,
  addFile,

};
