const mongoose = require('mongoose');
const { Schema } = mongoose;

const MonkeySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Monkey = mongoose.model('Monkey', MonkeySchema);

module.exports = Monkey;
