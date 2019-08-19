var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ExamSchema = new mongoose.Schema({
  title:{
    default:'',
    required: true,
    type:String,
  },
  //考试说明
  note:{
    default:'',
    type:String,
  },
  examTime:{
    start:{
      type:Date,
      default:Date.now()
    },
    end:{
      type:Date,
      default:Date.now()
    },
  },
  //考试发布状态
  status:{
    default:0, // 0未发布 , 1发布 ,
    type:Number,
  },
  //及格分数
  standard_score:{
    default:60,
    type:Number,
  },
  // 答卷时间  分钟
  limit_min:{
    default:60,
    type:Number,
  },
  //试卷内容
  // paper:{
  //   type:ObjectId,
  //   ref:'Paper'
  // },
  paper:{
    default:'',
    type:String,
  },
  examinees:[
    {
      baseInfo:{
        type:ObjectId,
        ref:'User'
      },
      score:{
        default:-1,
        type:Number,
      },
      answers:{
        default:'',
        type:String,
      },
      quiz_start_time:{
        type:Date
      }
    }
  ],
  creator:{
    type:ObjectId,
    ref:'User'
  },
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    },
  },
});
ExamSchema.pre('save',function(next){
  var user = this;
  if(this.isNew){
    this.meta.creatAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
});




ExamSchema.statics = {
  fetch:function(cb){
    return this
      .find({})
      .populate(["creator","examinees.baseInfo"])
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById:function(id,cb){
    return this
      .findOne({_id:id})
      .populate(["creator","examinees.baseInfo"])
      .exec(cb)
  },
}
module.exports = ExamSchema
