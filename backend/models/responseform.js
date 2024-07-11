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
  focusAreas: {
    type: String,
    required: true
  },
  questionTypes: {
    type: [String],
    required: true,
    enum: ['QCM', 'Open']
  }
}, { timestamps: true });

module.exports = mongoose.model('ResponseForm', responseFormSchema);
