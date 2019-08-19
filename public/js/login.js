$("#register-button").on("click",function(e){
  e.preventDefault;
  var judge = validateForm('register')
  if(judge.success){
    $('form').fadeOut(500,function(){
      console.log('消失后');
      submit({
        email:judge.email,
        password:judge.password,
        repassword:judge.repassword
      },
      '/user/signup',
      'post',
      function(response){
        console.log(response);
        if(response.success){
          Alert.success('','注册成功',{displayDuration: 1500, pos: 'top'})
          setTimeout(function(){
            window.location.pathname = '/signin'
          },1000)
        }
        else{
          $('form').fadeIn(500)
          Alert.success(response.msg,'注册失败',{displayDuration: 1500, pos: 'top'})
        }
      },
      function(){
        $('form').fadeIn(500)
      }
    )
    });

  }

})

$("#login-button").on("click",function(e){
  e.preventDefault;
  var judge = validateForm('login')
  if(judge.success){
    $('form').fadeOut(500,function(){
      console.log('消失后');
      submit({
        email:judge.email,
        password:judge.password
      },
      '/user/signin',
      'post',
      function(response){
        console.log(response);
        if(response.success){
          window.location.pathname = '/'
        }
        else{
          $('form').fadeIn(500)
          Alert.success(response.msg,'登录失败',{displayDuration: 1500, pos: 'top'})
        }
      },
      function(){
        $('form').fadeIn(500)
      }
    )
    });

  }
})

var validateForm = function(type){
  //检验邮箱
  var email = $("input[name='email']");
  var password = $("input[name='password']");
  var repassword = $("input[name='repassword']");
  var code = $("input[name='code']");
  console.log(code.val());
  if(type == "validate"){
    if(!email.val()){
      Alert.error('邮箱必填','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }
    if(!email.val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
      Alert.error('邮箱格式错误','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }
  }
  if(type == 'register' || type == 'login'){
    if(!email.val()){
      Alert.error('邮箱必填','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }
    if(!email.val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
      Alert.error('邮箱格式错误','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }

    if(!password.val()){
      Alert.error('密码必填','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }
  }

  if(type == 'register'||type == 'confirm'){
    if(!password.val() || !repassword.val()){
      Alert.error('密码必填','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}

    }
    if(password.val() != repassword.val()){
      Alert.error('两次密码输入不一致','表单报错',{displayDuration: 1500, pos: 'top'})
      return {success:false}
    }
  }
  return {success:true,email:email.val(),password:password.val(),repassword:repassword.val(),code:code.val()}
}



var submit = function(data,url,type,s_callback,f_callback){
  console.log(data);
  console.log(url);
  console.log(type);
  $.ajax({
      url:url,
      type:type||'POST', //GET
      async:true,    //或false,是否异步
      data:data,
      timeout:5000,    //超时时间
      dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
      beforeSend:function(xhr){
          // console.log(xhr)
          // console.log('发送前')
      },
      success:function(data,textStatus,jqXHR){
          if(s_callback){
            s_callback(data)
          }
          // console.log(data)
          // console.log(textStatus)
          // console.log(jqXHR)
      },
      error:function(xhr,textStatus){
          if(f_callback){
            f_callback(xhr)
          }
          alert('请求报错')
          console.log('错误')
          console.log(xhr)
          console.log(textStatus)
      },
      complete:function(){
          // console.log('结束')
      }
  })
}
