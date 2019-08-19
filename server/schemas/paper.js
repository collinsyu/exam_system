var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PaperSchema = new mongoose.Schema({
  title:{
    default:'',
    required: true,
    type:String,
  },
  label:{
    default:'',
    type:Array,
  },
  total_score:{
    default:0,
    type:Number,
  },
  subjects:[
    {
      sub:{
        type:ObjectId,
        ref:'Question'
      },
      score:{
        default:0,
        type:Number,
      },
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
PaperSchema.pre('save',function(next){
  var user = this;
  if(this.isNew){
    this.meta.creatAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
});




PaperSchema.statics = {
  fetch:function(cb){
    return this
      .find({})
      .populate(["creator","subjects.sub"])
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById:function(id,cb){
    return this
      .findOne({_id:id})
      .populate(["creator","subjects.sub"])
      .exec(cb)
  },
}
module.exports = PaperSchema
