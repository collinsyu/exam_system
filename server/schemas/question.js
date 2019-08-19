var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var QuestionSchema = new mongoose.Schema({
  type:{
    default:'',
    required: true,
    type:String,
  },
  label:{
    default:'',
    type:Array,
  },
  //题干
  describe:{
    default:'',
    required: true,
    type:String,
  },
  //解析
  explain:{
    default:'',
    type:String,
  },
  right_value:{
    default:'',
    type:String,
  },
  answer:{
    default:[],
    // required: true,
    type:Array,
  },
  creator:{
    type:ObjectId,
    ref:'User'
  },
  usedInfo:[
    {
      type:ObjectId,
      ref:'Paper'
    }
  ],
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
QuestionSchema.pre('save',function(next){
  var user = this;
  if(this.isNew){
    this.meta.creatAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
});




QuestionSchema.statics = {
  fetch:function(cb){
    return this
      .find({})
      .populate(["creator"])
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById:function(id,cb){
    return this
      .findOne({_id:id})
      .populate(["creator"])
      .exec(cb)
  },
}
module.exports = QuestionSchema
