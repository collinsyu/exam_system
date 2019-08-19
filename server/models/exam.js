var mongoose = require('mongoose');
var ExamSchema = require('../schemas/exam');
var Exam = mongoose.model('Exam',ExamSchema);

module.exports = Exam
