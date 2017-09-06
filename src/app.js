const server = require('./server');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/monkeys/', {}, () => {
  console.log('connected to monkeys.');
});

server.listen(3000, () => {
  console.log("server up on port 3000.")
});
