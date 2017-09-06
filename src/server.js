const express = require('express');
const bodyParser = require('body-parser');
const Monkey = require('../models/monkeys');

const server = express();
server.use(bodyParser.json());

server.get('/monkey', (req, res) => {
  Monkey.find({}, (err, monkey) => {
    if (err) return res.send(err);
    res.send(monkey);
  });
});

server.post('/monkey', (req, res) => {
  const monkey = new Monkey(req.body);
  monkey.save((err, newMonkey) => {
    if (err) return res.send(err);
    res.send(newMonkey);
  });
});

module.exports = server;
