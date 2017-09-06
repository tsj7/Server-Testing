const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const Monkey = require('../models/monkeys')

const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon')

describe('Monkey', () => {


  describe('#getName()', () => {
    it('should return the name of a monkey', () => {
      const monkey = new Monkey({
        name: 'Bubbles'
      })
      expect(monkey.getName()).to.equal('Bubbles')
    })
    it('should return a string', () => {
      const monkey = new Monkey({
        name: 'Bubbles'
      })
      expect(typeof monkey.getName()).to.equal('string')
    })
  })

  describe('#getAllMonkeys()', () => {
    it('should return all the monkeys', () => {
      sinon.stub(Monkey, 'find');
      Monkey.find.yields(null, [{ name: 'Caesar' }])
      Monkey.getAllMonkeys((monkeys) => {
        expect(monkeys.length).to.equal(1)
        expect(monkeys[0].name).to.equal('Caesar')
        Monkey.find.restore();
      })
    })
  })
})
