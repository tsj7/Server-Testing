const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

const Monkey = require('./monkey')

const chai = require('chai')
const { expect } = chai;
const sinon = require('sinon')

describe('Monkey', () => {

  beforeEach(() => {
    sinon.stub(Monkey, 'find')
  })

  afterEach(() => {
    Monkey.find.restore()
  })

  describe('#getName()', () => {
    it('should return the name of a monkey', () => {
      const monkey = new Monkey({
        name: 'cheese doodles'
      })
      expect(monkey.getName()).to.equal('cheese doodles')
    })
    it('should return a string', () => {
      const monkey = new Monkey({
        name: 'cheese doodles'
      })
      expect(typeof monkey.getName()).to.equal('string')
    })
  })

  describe('#getAllMonkey()', () => {
    it('should return all the monkeys', () => {
      Monkey.find.yields(null, [{ name: 'pumpkin pie' }])
      Monkey.getAllMonkey((monkeys) => {
        expect(monkeys.length).to.equal(1)
        expect(monkeys[0].name).to.equal('pumpkin pie')
      })
    })
  })
})
