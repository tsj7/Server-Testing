const mongoose = require('mongoose');
const { Schema } = mongoose;

const MonkeySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});


MonkeySchema.methods.getName = function() {
  return this.name
}

MonkeySchema.statics.getAllMonkeys = function (cb) {
  Monkey.find({}, (err,monkey) => {
    if (err) return cb(err);
    cb(monkey);
  });
};
const Monkey = mongoose.model('Monkey', MonkeySchema);

module.exports = Monkey;
