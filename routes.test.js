const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Food = require('./food');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('/food', () => {
  beforeEach((done) => {
    Food.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /food', () => {
    it('should get all of the food', (done) => {
      chai.request(server)
        .get('/food')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe('[POST] /food', () => {
    it('should add a new food', (done) => {
      const food = {
        name: 'Hot Dog'
      };

      chai.request(server)
        .post('/food')
        .send(food)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Hot Dog');
          done();
        });
    });
  });
});
