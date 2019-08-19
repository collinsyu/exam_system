var Paper = require('../models/paper');




exports.add = function(req,res){
  var obj = {};

  obj.creator = req.session.user._id;
  obj.total_score = req.body.total_score;
  obj.subjects = req.body.subjects;
  obj.title = req.body.title;
  var saveData = new Paper(obj);
  saveData.save(function(err,back_data){
    if(err){
      console.log(err);
      res.json({ error: true,msg:'创建失败'+err })
    }
    Paper.findById(back_data._id,function(err,back_back_data){
      if(err){
        return console.log(err);
      }
      res.json({ success: true,msg:'创建成功',result:back_back_data })
    })
  })
}


exports.update = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  console.log(_id);
  Paper.findById(_id,function(err,back_data){
    if(err){
      return console.log(err);
    }
    console.log(back_data);
    if(req.body.total_score){back_data.total_score = req.body.total_score};
    if(req.body.subjects){back_data.subjects = req.body.subjects};
    if(req.body.title){back_data.title = req.body.title};

    back_data.save(function(err,back_back_data){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'更新失败'+err })
      }
      Paper.findById(back_data._id,function(err,back_back_back_data){
        if(err){
          return console.log(err);
        }
        res.json({ success: true,msg:'更新成功',result:back_back_back_data })
      })
    })

  })
}



exports.del = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Paper.remove({_id:_id},function(err,back_data){
    if(err){
      return console.log(err);
    }
    return res.json({ success: true,msg:'删除成功',result:back_data})
  })
}



exports.fetch = function(req,res){
  var params = req.body;
  var current = params.current;
  var pageSize = params.pageSize;
  var title = params.title;
  var label = params.label;
  var start = params.start;
  var end = params.end;

  delete params.current;
  delete params.pageSize;
  // 设置查询参数
  var obj = {};
  // 题干
  if(title){obj.title = new RegExp(title, 'i')};
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

  Paper.find(obj)
  .skip((current-1) * pageSize)
  .limit(pageSize)
  .sort({'meta.createAt':-1})
  .populate(["creator","subjects.sub"])
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    return res.json({ success: true,result:back_data||[]})
  })
}



exports.fetchById = function(req,res){
  var _id = req.body.id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Paper.findById(_id,function(err,back_data){
    if(err){
      return console.log(err);
    }
    return res.json({ success: true,msg:'查询成功',result:back_data})
  })
}





// 用于创建考试，添加试卷的模糊查询；
exports.fuzzySearch = function(req,res){
    var keyword = req.body.keyword
    console.log(keyword);
    var search_obj = {
      $or:[ { title:new RegExp(keyword, 'i') }]
    }
    if(req.localProps.user_fuzzy_ids){
      if(req.localProps.user_fuzzy_ids.length){
        console.log('进来了',req.localProps.user_fuzzy_ids);
        search_obj = {
          $or:[
            { title:new RegExp(keyword, 'i') },
            { creator:{ $in:req.localProps.user_fuzzy_ids.map(item=>item._id) }}
          ]
        }

      }
    }

    Paper.find(search_obj)
    .limit(10)
    .select('title creator _id meta total_score')
    .populate("creator")
    .exec(function(err,back_data){
      if(err){
        console.log(err);
      }
      return res.json({ success: true,results:back_data||[]})
    })
}
