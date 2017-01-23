const validTopic = require('../index').validTopic;
const isPattern = require('../index').isPattern;
const validPattern = require('../index').validPattern;

var expect    = require('chai').expect;

describe('Topic and pattern validator', function() {
  describe('Topics', function() {
    it('checks valid topics', function() {
      expect(validTopic('/')).to.be.true;
      expect(validTopic('foo')).to.be.true;
      expect(validTopic('for/BaR//baz')).to.be.true;
      expect(validTopic('/for/BaR//baz/')).to.be.true;
    });
    it('checks invalid topics', function() {
      expect(validTopic('')).to.be.false;
      expect(validTopic('+/foo')).to.be.false;
      expect(validTopic('foo/+')).to.be.false;
      expect(validTopic('foo/+/baz')).to.be.false;
      expect(validTopic('#/foo')).to.be.false;
      expect(validTopic('foo/#')).to.be.false;
      expect(validTopic('foo/#/baz')).to.be.false;
      expect(validTopic('for/Ba#R//baz')).to.be.false;
      expect(validTopic('/for/B+aR//baz/')).to.be.false;
    });

  });
  /*  describe('Pattern', function() {
      it('checks pattern', function() {
        expect(isPattern('/')).to.be.true;
        expect(isPattern('#')).to.be.true;
        expect(isPattern('for/+//baz')).to.be.true;
        expect(isPattern('/for/BaR//baz/#')).to.be.true;
        expect(isPattern('/for/++//baz/#')).to.be.false;
        expect(isPattern('foo/bar/baz')).to.be.false;
      });
      it('checks valid pattern', function() {
        expect(validPattern('/')).to.be.false;
        expect(validPattern('#')).to.be.true;
        expect(validPattern('for/+//baz')).to.be.true;
        expect(validPattern('/for/BaR//baz/#')).to.be.true;
        expect(validPattern('/for/++//baz/#')).to.be.false;
        expect(validPattern('foo/bar/baz')).to.be.true;

      });

    });*/
});
