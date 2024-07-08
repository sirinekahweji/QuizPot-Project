const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  formId: {
    type: Schema.Types.ObjectId,
    ref: 'QuestionForm',
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true,
    enum: ['QCM', 'Open']
  },
  options: {
    type: [String],
    required: function() { return this.questionType === 'QCM'; }
  },
  correctAnswer: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
