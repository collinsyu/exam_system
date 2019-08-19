var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs')
var nodemailer = require('nodemailer');
var Geetest = require('./gt-sdk');

var captcha = new Geetest({
    geetest_id: '7ba0d1aa71e2bdb46ab8045272a7afd8',
    geetest_key: 'c1989c53a9fbd64c1d722a5399999759'
});
var words_array = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
'r','s','t','u','v','w','x','y','z','_','$','#','&');//随机数




exports.init = function(req,res){
  // 向极验申请每次验证所需的challenge
  captcha.register(null, function (err, data) {
      if (err) {
          console.error(err);
          res.status(500);
          res.send(err);
          return;
      }

      if (!data.success) {
          // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
          // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

          // 为以防万一，你可以选择以下两种方式之一：

          // 1. 继续使用极验提供的failback备用方案
          req.session.fallback = true;
          res.send(data);

          // 2. 使用自己提供的备用方案
          // todo

      } else {
          // 正常模式
          req.session.fallback = false;
          res.send(data);
      }
  });
}


var createCode = function(){
  code = "";
  var codeLength = 6;//验证码的长度
  for(var i = 0; i < codeLength; i++) {//循环操作
    var index = Math.floor(Math.random()*words_array.length);//取得随机数的索引（0~35）
    code += words_array[index];//根据索引取得随机数加到code上
  }
  return code
}
exports.validate_email = function(req,res){
  var email = req.body.email;

  if(!email){
    return res.json({ error: true,msg:'缺少必要参数' })
  }
  User.findOne({email:email},function(err,user){
    if(err){
      return res.json({ error: true,msg:'查询数据库失败:'+err })
    }
    if(!user){
      return res.json({ error: true,msg:'邮箱未注册!' })
    }else{
      req.session.password_find_email = email;
      req.session.password_find_validate_code = createCode();
      var transporter = nodemailer.createTransport({
          host: 'smtp.exmail.qq.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: "yuhaiqing@eigpay.com", // generated ethereal user
              pass: ""  // generated ethereal password
          }
      });
      // setup email data with unicode symbols
      var mailOptions = {
          from: 'Niu Beeeeeeee.... 👻 <yuhaiqing@eigpay.com>', // sender address
          to: email, // list of receivers
          subject: '考试系统-验证码', // Subject line
          // text: 'Hello world?', // plain text body
          html: '<!DOCTYPE html><html class=""><head><meta charset="UTF-8" /><style class="">    html,    body {      background: #fff;      width: 100%;      height: 100%;      overflow: hidden;      cursor: default;      -webkit-user-select: none;      -moz-user-select: none;      -ms-user-select: none;      user-select: none;      font-family: \'PT Sans\', sans-serif;    }    .title {      font-size: 10vw;      font-weight: 700;      text-align: center;      margin-top: 10%;      color: #444;    }    .subtitle {      font-size: 4vw;      color: #777;      font-weight: normal;      text-align: center;      margin-top: 0;    }</style></head><body><h1 class="title">'+
          req.session.password_find_validate_code+'</h1><h4 class="subtitle">☝☝☝ 上面的就是<u>验证码</u></h4><p>如果非本人操作，请联系管理员，把坏人屏蔽掉</p><div class="particles"></div></body></html>',
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          req.session.password_find_date = new Date().getTime();
          return res.json({ success: true,msg:"验证码已发送至邮箱，请注意查收邮箱，并在五分钟内使用。" })
      });


    }
  })
}

exports.checkSession = function(req,res,next){
  var password_find_validate_code = req.session.password_find_validate_code;
  var password_find_date = req.session.password_find_date;
  var password_find_email = req.session.password_find_email;
  if(!password_find_validate_code || !password_find_date || !password_find_email){
    return res.redirect('/password_find')
  }
  next()
}

// 过期 0100  需要跳转
// 缺少必要参数 0110 不需要跳转
exports.reset_password = function(req,res){
  var password_find_validate_code = req.session.password_find_validate_code;
  var password_find_date = req.session.password_find_date;
  var password_find_email = req.session.password_find_email;

  if(!password_find_validate_code || !password_find_date || !password_find_email){
    return res.json({ success: false,msg:'验证码过期,请重新获取验证码',error_code:"0100"});
  }
  var now_date = new Date;
  if(now_date.getTime()>300000+password_find_date){
    return res.json({ success: false,msg:'验证码过期,请重新获取验证码',error_code:"0100" });
  }
  var code = req.body.code;
  var email = req.body.email;
  var password = req.body.password;
  var repassword = req.body.repassword;
  if(!code || !email|| !password || !repassword){
    return res.json({ success: false,msg:'缺少必要参数',error_code:"0110"  })
  }
  if(repassword != password){
    return res.json({ success: false,msg:'两次密码输入不一致',error_code:"0110"  });
  }
  if(code != password_find_validate_code){
    return res.json({ success: false,msg:'验证码输入错误',error_code:"0110"  });
  }
  if(email != password_find_email){
    return res.json({ success: false,msg:'用户邮箱错误',error_code:"0100"  });
  }

  User.findOne({email:email},function(err,user){
    if(err){
      return res.json({ error: true,msg:'查询数据库失败:'+err ,error_code:"0110"})
    }
    user.password = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    user.meta.wrong_times = 0;
    user.save(function(err,user){
      if(err){
        return res.json({ error: true,msg:'修改失败'+err,error_code:"0110" })
      }
      console.log(user.meta);
      return res.json({ success: true,msg:'修改成功' })
    })
  })
}
