var Question = require('../models/question');
// var fs = require('fs');
// var path = require('path');
// var bcrypt = require('bcrypt-nodejs')



exports.add = function(req,res){
  var obj = {};
  var newAnswer = [];
  var right_value = [];
  req.body.answer.map(function(item,index){
    if(item.isRight){
      right_value.push(index)
    }
    newAnswer.push({
      isRight:item.isRight,
      label:item.label,
      value:index
    })
  });

  obj.answer = newAnswer;
  obj.creator = req.session.user._id;
  obj.describe = req.body.describe;
  obj.right_value = right_value.join(",");
  obj.explain = req.body.explain;
  obj.label = req.body.label;
  obj.type = req.body.type;
  var saveData = new Question(obj);
  saveData.save(function(err,back_data){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'创建失败'+err })
    }
    Question.findById(back_data._id,function(err,back_back_data){
      if(err){
        return console.log(err);
      }
      res.json({ success: true,msg:'创建成功',result:back_back_data })
    })
  })
}

exports.authority = function(req,res,next){
  var _id = req.body._id;
  var user = req.session.user;
  if(user.email == "yuhaiqing@eigpay.com"){
    return next();
  }
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Question.findOne({_id:_id},function(err,back_data){
    if(err){
      return console.log(err);
    }
    if(back_data.creator == user._id){
      return next();
    }
    else{
      return res.json({ success: false,msg:'没有权限删除其他人创建的试题',result:{}})
    }
  })
}
exports.del = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Question.remove({_id:_id},function(err,back_data){
    if(err){
      return console.log(err);
    }
    return res.json({ success: true,msg:'删除成功',result:back_data})
  })
}

exports.update = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }

  Question.findById(_id,function(err,back_data){
    if(err){
      return console.log(err);
    }
    if(req.body.describe){back_data.describe = req.body.describe};
    if(req.body.explain){back_data.explain = req.body.explain};
    if(req.body.label){back_data.label = req.body.label};
    if(req.body.type){back_data.type = req.body.type};
    if(req.body.answer){
      var newAnswer = [];
      var right_value = [];
      req.body.answer.map(function(item,index){
        if(item.isRight){
          right_value.push(index)
        }
        newAnswer.push({
          isRight:item.isRight,
          label:item.label,
          value:index
        })
      });
      back_data.answer = newAnswer;
      back_data.right_value = right_value.join(",");
    };
    back_data.save(function(err,back_back_data){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'更新失败'+err })
      }
      Question.findById(back_data._id,function(err,back_back_back_data){
        if(err){
          return console.log(err);
        }
        res.json({ success: true,msg:'更新成功',result:back_back_back_data })
      })
    })

  })
}


exports.fetch = function(req,res){
  var params = req.body;
  var current = params.current;
  var pageSize = params.pageSize;
  var type = params.type ;
  var describe = params.describe;
  var label = params.label;
  var start = params.start;
  var end = params.end;

  delete params.current;
  delete params.pageSize;
  // 设置查询参数
  var obj = {};
  // 类型
  if(type){obj.type = type};
  // 题干
  if(describe){obj.describe = new RegExp(describe, 'i')};
  // 标签
  if(label){if(label.length){obj.label = { $in: label } }};
  // 创建时间
  if(start && !end){obj['meta.createAt'] = {"$gt":start}};
  if(end && !start){obj['meta.createAt'] = {"$lt":end}};
  if(end && start){obj['$and'] = [{"meta.createAt":{"$gt":start}},{"meta.createAt":{"$lt":end}}]};
  // 创建者
  if(req.localProps.user_fuzzy_ids){
    console.log(req.localProps.user_fuzzy_ids);
    if(req.localProps.user_fuzzy_ids.length){

      obj.creator = { $in:req.localProps.user_fuzzy_ids.map(item=>item._id) }
    }
  }

  Question.find(obj)
  .skip((current-1) * pageSize)
  .limit(pageSize)
  .sort({'meta.createAt':-1})
  .populate("creator")
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    return res.json({ success: true,result:back_data||[]})
  })
}
