const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    formResponseId: {
      type: Schema.Types.ObjectId,
      ref: 'ResponseForm',
      required: true
    },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
