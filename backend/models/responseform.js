const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseFormSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  numQuestions: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: false
  },
  focusAreas: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ResponseForm', responseFormSchema);
