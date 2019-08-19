var Exam = require('../models/exam');
var Paper = require('../models/paper');
var _ = require("underscore");



exports.add = function(req,res){
  var obj = {};
  var paperId = req.body.paper;


  obj.creator = req.session.user._id;
  obj.title = req.body.title;
  obj.note = req.body.note;
  obj.examTime = {start:req.body.start,end:req.body.end};
  obj.standard_score = req.body.standard_score;
  obj.limit_min = req.body.limit_min;
  // obj.paper = req.body.paper;
  obj.examinees = req.body.examinees;
  obj.status = req.body.status;

  Paper.findById(paperId,function(err,paper_back_data){
    if(err){
      return console.log(err);
    }
    if(!paper_back_data){
      return res.json({ error: true,msg:'创建失败' })
    }
    // console.log(JSON.stringify(paper_back_data));
    // console.log('==========================================');
    obj.paper = JSON.stringify(paper_back_data);

    var saveData = new Exam(obj);
    saveData.save(function(err,back_data){
      if(err){
        console.log(err);
        res.json({ error: true,msg:'创建失败'+err })
      }
      Exam.findById(back_data._id,function(err,back_back_data){
        if(err){
          return console.log(err);
        }
        back_back_data = back_back_data.toObject();
        back_back_data.paper = JSON.parse(back_back_data.paper)
        res.json({ success: true,msg:'创建成功',result:back_back_data })
      })
    })
  })

}


exports.update = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  console.log(_id);
  Exam.findById(_id,function(err,back_data){
    if(err){
      return console.log(err);
    }
    if(!back_data){
      return res.json({ success: false,msg:'查无此项',result:{}})
    }
    if(back_data.creator._id != req.session.user._id){
      return res.json({ success: false,msg:'没有权限',result:{}})
    }

    if(req.body.title){back_data.title = req.body.title};
    if(req.body.note){back_data.note = req.body.note};
    if(req.body.examTime){
      if(req.body.examTime.start){back_data.examTime.start = req.body.examTime.start};
      if(req.body.examTime.end){back_data.examTime.end = req.body.examTime.end};
    };

    if(req.body.standard_score){back_data.standard_score = req.body.standard_score};
    if(req.body.limit_min){back_data.limit_min = req.body.limit_min};
    if(req.body.examinees){back_data.examinees = req.body.examinees};
    if(req.body.status){back_data.status = req.body.status};

    var paperId = req.body.paper;


    if(paperId){
      Paper.findById(paperId,function(err,paper_back_data){
        if(err){
          return console.log(err);
        }
        if(!paper_back_data){
          return res.json({ error: true,msg:'更新失败' })
        }

        back_data.paper = JSON.stringify(paper_back_data);

        back_data.save(function(err,back_data_s){
          if(err){
            console.log(err);
            res.json({ error: true,msg:'更新失败'+err })
          };
          console.log('back_data_s._id',back_data_s._id);
          Exam.findById(back_data_s._id,function(err,back_back_data){
            if(err){
              return console.log(err);
            }
            console.log(back_back_data);
            back_back_data = back_back_data.toObject();
            back_back_data.paper = JSON.parse(back_back_data.paper)
            res.json({ success: true,msg:'更新成功',result:back_back_data })
          })
        })
      })
    }
    else{
      back_data.save(function(err,back_data_s){
        if(err){
          console.log(err);
          res.json({ error: true,msg:'更新失败'+err })
        };
        console.log('back_data_s._id',back_data_s._id);
        Exam.findById(back_data_s._id,function(err,back_back_data){
          if(err){
            return console.log(err);
          }
          console.log(back_back_data);
          back_back_data = back_back_data.toObject();
          back_back_data.paper = JSON.parse(back_back_data.paper)
          res.json({ success: true,msg:'更新成功',result:back_back_data })
        })
      })
    }



  })
}



exports.del = function(req,res){
  var _id = req.body._id;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Exam.remove({_id:_id},function(err,back_data){
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
  var status = params.status;
  var start = params.start;
  var end = params.end;

  delete params.current;
  delete params.pageSize;
  // 设置查询参数
  var obj = {};
  // 题干
  if(title){obj.title = new RegExp(title, 'i')};
  // 标签
  if(status){obj.status = status };
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

  Exam.find(obj)
  .skip((current-1) * pageSize)
  .limit(pageSize)
  .sort({'meta.createAt':-1})
  .populate(["creator","examinees.baseInfo"])
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    var result = back_data||[];
    var newResult = [];
    result.map(function(item){
      if(item){
        item = item.toObject();
        item.paper = JSON.parse(item.paper);
        newResult.push(item)
      }
    })
    // console.log(result);
    return res.json({ success: true,result:newResult})
  })
}



exports.fetchByUserId = function(req,res){
  var user_id = req.body._id;
  var user = req.session.user;
  if(!user_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Exam.find({
    "examinees.baseInfo": user_id,
    status:1,
  })
  .populate(["creator","examinees.baseInfo"])
  .exec(function(err,back_data){
      if(err){console.log(err)};

      var finish = [];
      var unfinish = [];

      // 上面查询的不算数
      // 这里必须重新加判断 push 哪些是未考，哪些是已考
      back_data.map(function(item){

        item = item.toObject();
        //计算排名
        var sort_arr = _.sortBy(item.examinees, 'score');
        sort_arr = sort_arr.reverse();
        item.quiz = _.find(sort_arr, function(itemsss_s,index){

          itemsss_s.rank = index+1; // 计算名次
          itemsss_s.defeat = ((1 - itemsss_s.rank/item.examinees.length)*100).toFixed(2);//计算打败人；
          return itemsss_s.baseInfo._id == user._id
        });
        // 计算平均分
        var score_arr = _.map(item.examinees, function(ls){ return ls.score });
        var sum = _.reduce(score_arr, function(a, b){ return a + b }, 0);
        item.average_score = sum/item.examinees.length;





        // delete item.examinees;
        delete item.paper;
        // 完成的包括 两种情况， 1.参加考试并取得成绩；2.未按时参加考试；
        // 未完成的，就是 时间在考试时间之内，且分数为-1
        if(item.quiz.score == -1 && item.examTime.end>new Date()){
          if(!item.quiz.quiz_start_time){
            unfinish.push(item)
          }
          else{
            var start = (new Date(item.quiz.quiz_start_time)).getTime(); //毫秒;
            var limit = item.limit_min*60*1000;
            var count = Math.floor((start + limit - (new Date()).getTime())/1000);
            if(count<-1){
              finish.push(item)
            }
            else{
              unfinish.push(item)
            }
          }
        }
        else if(item.quiz.score > -1 || item.examTime.end>new Date() ){
          finish.push(item)
        }
      })


      return res.json({ success: true,result:{finish:finish,unfinish:unfinish}})


  })


}

exports.fetchByExamId = function(req,res){
  var _id = req.body._id;
  var user = req.session.user;
  if(!_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Exam.findOne({_id:_id})
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    if(!back_data){
      return res.json({ success: false,msg:'查询报错',result:{}})
    }

    // 这里是避免一些程序员，搞到了 考试id，然后自己瞎鸡巴搞！
    // 凡是分数不为-1，或者时间过时了，都直接不让进，直接退回去； 分数为-1的情况，下面排除掉，这里只检查过时

    if(back_data.examTime.end < new Date()){
      return res.json({ success: false,result:{},msg:"未按规定时间参加考试，成绩为-1，缺考"})
    }
    //这里是在考试期内进入考试，创建首次考试时间，判断计时
    var overTime = false;

    back_data.examinees.map(function(item){
      if(item.baseInfo == user._id){
        if(!item.quiz_start_time){
          return item.quiz_start_time = Date.now();
        }
        var start = (new Date(item.quiz_start_time)).getTime(); //毫秒;
        var limit = back_data.limit_min*60*1000;
        var count = Math.floor((start + limit - (new Date()).getTime())/1000);
        if(count<-1){
          overTime = true;
        }
      }
    });
    if(overTime){
      return res.json({ success: false,result:{},msg:"考试时间结束，成绩按照最后一次保存计算"})
    }
    back_data.save(function(err,back_back_data){
      if(err){
        console.log(err);
        return res.json({ error: true,msg:'处理失败'+err })
      };
      back_back_data = back_back_data.toObject();
      back_back_data.quiz = _.find(back_back_data.examinees, function(item){ return item.baseInfo == user._id});
      delete back_back_data.examinees;
      if(back_back_data.quiz.score>-1){
        return res.json({ success: false,result:{},msg:"你已经参加过考试了，不能再次参加"})
      }
      back_back_data.paper = JSON.parse(back_back_data.paper);
      back_back_data.paper.subjects.map(function(item_1){
        item_1.sub.answer.map(function(item_2){
          delete item_2.isRight
        })
      });

      return res.json({ success: true,result:back_back_data})
    })



  })

}
exports.fetchByExamId_admin = function(req,res){
  var id = req.body.id;
  if(!id){
    return res.json({ success: false,result:{},msg:"缺少必要参数"});
  }
  Exam.findById(id,function(err,back_data){
    if(err){
      console.log(err);
    }
    if(!back_data){
      return res.json({ success: false,result:{},msg:"查无信息"});
    }
    return res.json({ success: true,result:back_data});
  })
}


//判卷
exports.grade = function(req,res){
  var exam_id = req.body.exam_id;
  var answers = req.body.answers||"{}";
  var user = req.session.user;
  if(!exam_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  Exam.findOne({_id:exam_id})
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    if(!back_data){
      return res.json({ success: false,msg:'没有考试信息',result:{}})
    }

    var paper_arr = JSON.parse(back_data.paper);//[{score:xxx,_id:xxx,sub:{}}]
    var answers_arr = JSON.parse(answers);//{_id:value}
    var subjects = paper_arr.subjects||[];
    var score = 0;
    subjects.map(function(item){
      if(answers_arr[item._id] != undefined){
        if(typeof(answers_arr[item._id]) == "object"){
          answers_arr[item._id] = answers_arr[item._id].join(",")
        };
        if(answers_arr[item._id] == item.sub.right_value){
          score += item.score
        }
      }
    })
    console.log(score);
    back_data.examinees.map(function(item){
      if(item.baseInfo == user._id){
        item.answers = answers;
        item.score = score;
      }
    });

    back_data.save(function(err,back_back_data){
      if(err){
        console.log(err);
        return res.json({ error: true,msg:'处理失败'+err })
      };
      return res.json({ success: true,result:{}})
    })



  })
}

//判卷
exports.gradeByAdmin = function(req,res,next){
  var exam_id = req.body.exam_id;
  var user_id = req.body.user_id;
  var answers = req.body.answers||"{}";
  if(!exam_id || !user_id){
    return res.json({ success: false,msg:'缺少参数',result:{}})
  }
  var user = {_id:user_id};

  Exam.findOne({_id:exam_id})
  .exec(function(err,back_data){
    if(err){
      console.log(err);
    }
    if(!back_data){
      return res.json({ success: false,msg:'没有考试信息',result:{}})
    }

    var paper_arr = JSON.parse(back_data.paper);//[{score:xxx,_id:xxx,sub:{}}]
    var answers_arr = JSON.parse(answers);//{_id:value}
    var subjects = paper_arr.subjects||[];
    var score = 0;
    subjects.map(function(item){
      if(answers_arr[item._id] != undefined){
        if(typeof(answers_arr[item._id]) == "object"){
          answers_arr[item._id] = answers_arr[item._id].join(",")
        };
        if(answers_arr[item._id] == item.sub.right_value){
          score += item.score
        }
      }
    })
    console.log(score);
    back_data.examinees.map(function(item){
      if(item.baseInfo == user._id){
        item.answers = answers;
        item.score = score;
      }
    });

    back_data.save(function(err,back_back_data){
      if(err){
        console.log(err);
        return res.json({ error: true,msg:'处理失败'+err })
      };
      // req.body.id = back_back_data._id;

      // next()
      Exam.populate(back_back_data,["creator","examinees.baseInfo"], function(err, exam) {
        return res.json({ success: true,result:exam})

      });
    })
  })
}
