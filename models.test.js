const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const Food = require('./food');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

describe('Food', () => {
  describe('#getName()', () => {
    it('should return the name of the food', () => {
      const food = new Food({
        name: 'Rib Steak'
      });
      expect(food.getName()).to.equal('Rib Steak');
    });
    it('should return a string', () => {
      const food = new Food({
        name: 'Rib Steak'
      });
      expect(typeof food.getName()).to.equal('string');
    });
  });

  describe('#getAllFoods()', () => {
    it('should return all the foods', () => {
      sinon.stub(Food, 'find');      
      Food.find.yields(null, [{ name: 'pumpkin pie'}]);
      Food.getAllFoods((foods) => {
        expect(foods.length).to.equal(1);
        expect(foods[0].name).to.equal('pumpkin pie');
        Food.find.restore();        
      });
    });
  });
});