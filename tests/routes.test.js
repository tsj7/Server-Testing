const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Monkey = require('../models/monkeys');
const server = require('../src/server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/monkey', () => {
  beforeEach((done) => {
    Monkey.remove({})
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /monkey', () => {
    it('should get all of the monkeys', (done) => {
      chai.request(server)
        .get('/monkey')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(0);
          console.log(res.body);
          done();
        });
    });
  });

  describe('[POST] /monkey', () => {
    it('should add a new monkey', (done) => {
      const monkey = {
        name: 'MonkeyDawg'
      };

      chai.request(server)
        .post('/monkey')
        .send(monkey)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('MonkeyDawg');
          done();
        });
    });
  });

  describe('/PUT/:id', () => {
    it('it should UPDATE a monkey given the id', (done) => {
      let monkey = new Monkey({name: "Coco"})

      monkey.save((err, monkey) => {
        chai.request(server)
          .put('/monkey/' + monkey.id)
          .send({name: "Harambe"})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Harambe');
            done();
          });
    });
  });
});
