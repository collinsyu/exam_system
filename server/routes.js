var User = require('./controllers/user');
var Question = require('./controllers/question');
var Paper = require('./controllers/paper');
var GT = require('./utils/gt');
var Exam = require('./controllers/exam');


module.exports = function(app){
  //pre handle user
  app.use(function(req, res, next){
    // console.log('我是reqqqqqqqqqqqqqqq吖'+req);
    var _user = req.session.user;
    app.locals.user=_user;
    req.localProps = {}
    next()
  })


  /*
  *
  *
  * 下面这部分都是页面渲染
  *
  */
  app.get('/signin',User.showSignin)
  // app.get('/signup',User.showSignup)
  app.get('/password_find',function (req, res) {
      res.render('login/password_find',{
        title:'重设密码',
      })
  });
  app.get('/gt/register-click',GT.init)
  app.post('/gt/validate',GT.validate_email)
  app.get('/password_reset',GT.checkSession,function (req, res) {
      res.render('login/password_reset',{
        title:'重设密码',
        email:req.session.password_find_email
      })
  });
  app.post('/gt/reset_password',GT.reset_password)

  app.get('/',User.signinRequired,function (req, res) {
      res.render('containers/home',{
        title:'我的试卷',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/settings',User.signinRequired,function (req, res) {
      res.render('containers/person',{
        title:'个人信息',
        sider:true,
        userinfo:req.session.user,
      })
  });
  //开始考试
  app.get('/quiz/:id',User.signinRequired,function (req, res) {
      res.render('containers/quiz',{
        title:'测验',
        sider:false,
        userinfo:req.session.user,
      })
  });
  app.get('/paper',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/paper',{
        title:'考卷管理',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/paper/manage*',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/paper',{
        title:'考卷管理',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/question',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/question',{
        title:'题库管理',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/exam',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/exam',{
        title:'考试管理',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/exam/:id',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/exam_detaill',{
        title:'考试管理',
        sider:true,
        userinfo:req.session.user,
      })
  });
  app.get('/user',User.signinRequired,User.adminRequired,function (req, res) {
      res.render('containers/user',{
        title:'用户管理',
        sider:true,
        userinfo:req.session.user,
      })
  });



  /*
  * 下面这部分都是ajax请求api
  *
  *
  *
  *
  *
  */
  //User
  app.post('/user/signup',User.signup)
  app.post('/user/signin',User.signin)
  app.get('/logout',User.logout)
  //



  //模糊查询user信息
  // app.post('/api/user/fuzzy',User.signinRequired,User.fuzzySearch);

  //获得当前session中的用户最新最新全部信息
  app.get('/api/userInfo',User.signinRequired,User.getUserInfo);

  //用户更新个人信息 !!!!不接受邮箱+权限的修改参数；
  app.post('/api/user/setuser',User.signinRequired,User.update)

  //任意类型上传头像api
  app.post('/api/avatar',User.signinRequired,User.savedPosterOnly)






  //管理员添加用户
  app.post('/api/user/add',User.signinRequired,User.adminRequired,User.addUser);
  //管理员删除用户
  app.delete('/api/user/delete',User.signinRequired,User.adminRequired,User.del);
  //管理员更新用户信息
  app.post('/api/user/update',User.signinRequired,User.adminRequired,User.updateUser);
  // 管理员请求全部用户,带条件
  app.post('/api/user/fetch',User.signinRequired,User.adminRequired,User.fetch);
  // 管理员批量添加用户 ，  邮箱  姓名   密码，其他默认
  app.post('/api/user/name_list',User.signinRequired,User.adminRequired,User.batchUserAdd)




  // 题目管理
  // 新增
  app.post('/api/question/add',User.signinRequired,User.adminRequired,Question.add);
  // 更新
  app.post('/api/question/update',User.signinRequired,User.adminRequired,Question.update);
  // 请求题目表格数据
  app.post('/api/question/fetch',User.signinRequired,User.adminRequired,User.fuzzySearch_user_ids,Question.fetch);
  // 删除item
  app.delete('/api/question/delete',User.signinRequired,User.adminRequired,Question.authority,Question.del);



  //试卷管理
  app.post('/api/paper/add',User.signinRequired,User.adminRequired,Paper.add);
  //请求试卷数据
  app.post('/api/paper/fetch',User.signinRequired,User.adminRequired,User.fuzzySearch_user_ids,Paper.fetch);
  // 根据id请求单个数据；
  app.post('/api/paper/fetchById',User.signinRequired,User.adminRequired,Paper.fetchById);
  // 删除item
  app.delete('/api/paper/delete',User.signinRequired,User.adminRequired,Paper.del);
  // 更新
  app.post('/api/paper/update',User.signinRequired,User.adminRequired,Paper.update);
  // 模糊查询paper
  app.post('/api/paper/fuzzy',User.signinRequired,User.adminRequired,User.fuzzySearch,Paper.fuzzySearch);



  // 考试管理
  app.post('/api/exam/add',User.signinRequired,User.adminRequired,Exam.add);
  // 请求考试管理信息
  app.post('/api/exam/fetch',User.signinRequired,User.adminRequired,User.fuzzySearch_user_ids,Exam.fetch);
  // 删除item
  app.delete('/api/exam/delete',User.signinRequired,User.adminRequired,Exam.del);
  // 更新
  app.post('/api/exam/update',User.signinRequired,User.adminRequired,Exam.update);



  //个人用户请求考试信息list；
  app.post('/api/exam_user/list',User.signinRequired,Exam.fetchByUserId);
  //用户开始考试,请求试卷信息
  app.post('/api/exam_user/exam',User.signinRequired,Exam.fetchByExamId);
  //用户提交考试答案
  app.post('/api/exam_user/submit',User.signinRequired,Exam.grade);

  //用户异常关闭考试，管理员手动终止考试
  app.post('/api/exam_admin/shutdown',User.signinRequired,User.adminRequired,Exam.gradeByAdmin);
  //管理员查看考试信息，请求单个考试详情
  app.post('/api/exam_admin/exam',User.signinRequired,User.adminRequired,Exam.fetchByExamId_admin);



  app.get('/*',function (req, res) {
    var array404 = ['cubic','light','default','monkey','shake','tv','game404'];
    var num404 = Math.floor(Math.random()*array404.length);
    var name404 = array404[num404]||'default'
    res.render('404/'+name404,{
      title:'404',
      // session:req.session
    })
  });
}
