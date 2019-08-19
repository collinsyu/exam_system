var User = require('../models/user');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs')
var xlsx = require('node-xlsx');
//实验
var formidable = require('formidable')

exports.firstRunToAdmin = function(){
  var _user = {
    email:'yuhaiqing@eigpay.com',
    password:123456,
    name:'于海清',
    role:100,
  }
  User.findOne({email:_user.email},function(err,user){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'查询数据库失败:'+err })
    }
    if(user){
      console.log('邮箱已存在');
      return
    }else{
      user = new User(_user);
      user.save(function(err,user){
        if(err){
          console.log(err);
          res.json({ error: true,msg:'注册入库失败'+err })
        }
        return
      })
    }
  })
}

//signup
exports.signup = function(req,res){
  console.log(req.body);
  var _user = {
    email:req.body.email,
    password:req.body.password
  }

  if(_user.email == 'yuhaiqing@eigpay.com'){
    _user.role = 100
  }
  User.findOne({email:_user.email},function(err,user){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'查询数据库失败:'+err })
    }
    if(user){
      console.log('邮箱已存在');
      return res.json({ error: true,msg:'邮箱已存在,请直接登录' })
      // return res.redirect('/signin')
    }else{
      user = new User(_user);
      user.save(function(err,user){
        if(err){
          console.log(err);
          res.json({ error: true,msg:'注册入库失败'+err })
        }
        // res.redirect('/signin')
        res.json({ success: true,msg:'注册成功' })
      })
    }
  })
};

//addUser
exports.addUser = function(req,res){
  console.log(req.body);
  var _user = req.body;
  _user.password = '123456'
  User.findOne({email:_user.email},function(err,user){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'查询数据库失败:'+err })
    }
    if(user){
      console.log('邮箱已存在');
      return res.json({ error: true,msg:'邮箱已存在' })
      // return res.redirect('/signin')
    }
    user = new User(_user);
    user.save(function(err,user){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'注册入库失败'+err })
      }
      // res.redirect('/signin')
      return res.json({ success: true,msg:'新增成功',result:user })
    })
  })

};
exports.updateUser = function(req,res){
  var id = req.body._id;
  if(id){
    User.findOne({email:req.body.email},function(err,user_e){
      if(err){
        console.log(err);
        return res.json({ error: true,msg:'查询数据库失败:'+err })
      }
      if(user_e){
        console.log('邮箱已存在');
        if(user_e._id != id){
          return res.json({ error: true,msg:'邮箱已存在' })
        }
        return updateUserPackage(id,res,req)
      }
      return updateUserPackage(id,res,req)
    })

  }
}
var updateUserPackage = function(id,res,req){
  User.findById(id,function(err,user){
    if(err){
      console.log(err);
    }
    if(req.body.name){user.name = req.body.name}
    if(req.body.job){user.job = req.body.job}
    if(req.body.email){user.email = req.body.email}
    if(req.body.phone){user.phone = req.body.phone}
    if(req.body.role){user.role = req.body.role}
    if(req.body.birth){user.birth = req.body.birth}
    if(req.body.gender){user.gender = req.body.gender}
    if(req.body.location){user.location = req.body.location}
    if(req.body.apartment){user.apartment = req.body.apartment}
    if(req.body.password){
      user.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    }
    user.save(function(err,userN){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'更新失败'+err })
      }
      res.json({ success: true,msg:'更新成功',result:userN})
    })
  })
}

exports.signin = function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email:email},function(err,user){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'查询数据库失败:'+err })
    }
    if(!user){

      console.log('邮箱不存在')
      // return res.redirect('/signup')
      //不要提示邮箱不存在，防止被别人爆破存在邮箱
      return res.json({ error: true,msg:'邮箱或密码不正确' })
    }
    if(user.meta.wrong_times > 5){
      return res.json({ error: true,msg:'您的账户因超过五次尝试错误密码被锁定，请更换密码' })

    }
    user.comparePassword(password,function(err,isMatch){
      if(err){
        console.log(err);
      }
      // var toSaveDate = JSON.parse(JSON.stringify(user));
      if(isMatch){
        console.log('匹配');
        //这里更新下登录时间；
        req.session.user = user;
        user.meta.lastLoginDateAt = Date.now();
        user.meta.wrong_times = 0;
        user.save(function(err,userN){
          if(err){  return console.log(err)};
          return res.json({ success: true,msg:'登陆成功',path:userN.email})
        })
      }
      else{
        console.log('不匹配,密码错误');
        user.meta.wrong_times = user.meta.wrong_times+1;
        user.save(function(err,userN){
          if(err){  return console.log(err)};
          return res.json({ error: true,msg:'用户名或密码错误，请重新登录' })
        })
      }
    })
  })
};



//logout
exports.logout = function(req,res){
  delete req.session.user;
  // res.json({ success: true,msg:'成功登出' })
  return res.redirect('/signin')
  // res.render('login/login',{
  //   title:'登录',
  // })
}



var random404 = function(){
  var array404 = ['cubic','light','default','monkey','shake','tv'];
  var num404 = Math.floor(Math.random()*array404.length);
  var name404 = array404[num404]||'default'
  return name404
}

//showSignin page
exports.showSignin = function(req,res){

    res.render('login/login',{
      title:'登录 · 仁聚汇通员工考试系统',
    })
}
//showSignin page
exports.showSignup = function(req,res){
    res.render('login/register',{
      title:'注册 · 仁聚汇通员工考试系统'
    })
}



//list delete user
exports.del = function(req,res){
  var id = req.body._id;
  if(id){
    User.remove({_id:id},function(err,user){
      if(err){
        return console.log(err);
      }
      return res.json({ success: true,msg:'删除成功',result:user})
    })
  }
}

//admin updateAt
exports.update = function(req,res){
  var id = req.body.id;
  var values = req.body.values;
  User.findById(id,function(err,user){
    if(err){
      console.log(err);
    }
    if(values.name){
      user.name = values.name
    }
    if(values.job){
      user.job = values.job
    }
    if(values.phone){
      user.phone = values.phone
    }
    if(values.location){
      user.location = values.location
    }
    if(values.apartment){
      user.apartment = values.apartment
    }
    if(values.avatar){
      user.avatar = values.avatar
    }
    if(values.birth){
      user.birth = values.birth
    }
    if(values.gender){
      user.gender = values.gender
    }
    if(values.password){
      user.password = bcrypt.hashSync(values.password,bcrypt.genSaltSync(10));
    }
    user.save(function(err,userN){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'更新失败'+err })
      }
      //万不得已吖，处理异步，
      req.session.user = userN

      res.json({ success: true,msg:'更新成功',result:userN})
    })
  })
}


exports.savedPosterOnly = function(req,res,next){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;     //保留后缀
  form.parse(req, function(err, fields, files){
    var posterData = files.avatar_file;
    // console.log(posterData);
    var filePath = posterData.path;
    var originalFilename = posterData.name;
    if(originalFilename){
      fs.readFile(filePath,function(err,data){
        var timestamp = Date.now();
        var type = posterData.type.split('/')[1];
        var poster = timestamp + '.'+type;
        var newPath = path.join(__dirname,'../../','/public/upload/avatar/' + poster);

        fs.writeFile(newPath,data,function(err){
          req.poster = poster;
          return res.json({ success: false,avatar:'/upload/avatar/'+poster})
        })
      })
    }
    else{
      return res.json({ success: false,msg:'上传失败'})
    }
  })
}

// minddleware for user
exports.signinRequired = function(req,res,next){

  var user = req.session.user;
  if(!user){
    return res.redirect('/signin')
  }
  next()
}
exports.adminRequired = function(req,res,next){
  var user = req.session.user;
  if(user.role<100){
    // return res.json({errMsg:'您没有权限'})
    var name_404 = random404()
    return res.render('404/'+name_404,{
      title:'登录页面',
      // isSignin:false
    })
  }
  next()
}

exports.getUserInfo = function(req,res,next){
  var user = req.session.user;
  User.findById(user._id,function(err,users){
    if(err){
      console.log(err);
    }
    return res.json({ success: true,userInfo:users})
  })
}





//模糊查询根据关键词
exports.fuzzySearch = function(req,res,next){
    var keyword = req.body.keyword
    console.log(keyword);
    User.find({  $or: [ { name:new RegExp(keyword, 'i') },
                        { email:new RegExp(keyword, 'i') }
                      ] })
    .limit(10)
    .select('name email avatar avatar_color _id')
    .sort('meta.updateAt')
    .exec(function(err,users){
      if(err){
        console.log(err);
      }
      req.localProps.user_fuzzy_ids = users;
      next()
    })
}


// 用于题目创建人的搜索 模糊查询id
exports.fuzzySearch_user_ids = function(req,res,next){
    var creator = req.body.creator;
    if(!creator){
      return next();
    }
    User.find({  $or: [ { name:new RegExp(creator, 'i') },
                        { email:new RegExp(creator, 'i') }
                      ] })
    .limit(10)
    .select('_id')
    .sort('meta.updateAt')
    .exec(function(err,users){
      if(err){
        console.log(err);
      }
      req.localProps.user_fuzzy_ids = users;
      next()
    })
}









//根据条件筛选请求用户数据

exports.fetch = function(req,res){
  var params = req.body;
  var current = params.current;
  var pageSize = params.pageSize;
  var name = params.name;
  var email = params.email;
  var apartment = params.apartment ;
  var job = params.job;

  delete params.current;
  delete params.pageSize;
  // 设置查询参数
  var obj = {};

  if(apartment){if(apartment.length){obj.apartment = apartment.join(",")}};
  if(job){obj.job = job};
  if(email){obj.email = new RegExp(email, 'i')};
  if(name){obj.name = new RegExp(name, 'i')};


  User.find(obj)
  .skip((current-1) * pageSize)
  .limit(pageSize)
  .sort({'meta.createAt':-1})
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    return res.json({ success: true,result:back_data||[]})
  })
}



//批量添加用户
exports.batchUserAdd = function(req,res,next){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;     //保留后缀
  form.parse(req, function(err, fields, files){
    var posterData = files.name_list;
    var filePath = posterData.path;
    var originalFilename = posterData.name;
    if(originalFilename){
      fs.readFile(filePath,function(err,data){
        var array_xlsx = xlsx.parse(data)[0].data;
        var array = [];
        array_xlsx.map(function(item){
          array.push({
            name:item[0],
            email:item[1],
            password:123456,
          })
        })
        console.log(array);
        User.create(array, function (err, jellybean, snickers) {
          if (err){console.log(err)}
          return res.json({ success: true,msg:'批量操作成功',result:jellybean})

        });


      })
    }
    else{
      return res.json({ success: false,msg:'上传失败'})
    }
  })
}
