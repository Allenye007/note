// 通过passport，token解析服务
const jwt = require('jsonwebtoken');
let tokenSecret = 'allen'
// token校验中间件
app.use(function(req,res,next){
    // 获取token
    let token = req.header('x-access-token') || req.body.token || req.query.token;
    jwt.verify(token,tokenSecret,(err,decoded)=>{
        if (err) {
            next();
        }else {
            req.currentUser = decoded;
            next();
        }
    });
});


// 需要验证时：
if(!req.currentUser) {
  // .......
  return;
}