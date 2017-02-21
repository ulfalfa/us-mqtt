const validTopic = require('../index').validTopic;
const mqtt = require('../index');

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

    it('joins and splits', function() {
      expect(mqtt.split('foo/bar/baz')).to.be.deep.equal(['foo','bar','baz']);
      expect(mqtt.join('foo','bar','baz')).to.be.equal('foo/bar/baz');
    });

    it('slices', function() {
      let topic = 'foo/bar/baz/test'
      expect(mqtt.slice(topic,0,1)).to.be.equal('foo');
      expect(mqtt.slice(topic,0)).to.be.equal('foo/bar/baz/test');
      expect(mqtt.slice(topic,-1)).to.be.equal('test');
      expect(mqtt.slice(topic,1,3)).to.be.equal('bar/baz');
      expect(mqtt.slice(topic,2,2)).to.be.equal('');
      expect(mqtt.slice(topic,-10)).to.be.equal('foo/bar/baz/test');
    });

    it('checks valid pattern', function() {
      expect(mqtt.validPattern('')).to.be.true;
      expect(mqtt.validPattern('+/foo')).to.be.true;
      expect(mqtt.validPattern('foo/+')).to.be.true;
      expect(mqtt.validPattern('foo/+/baz')).to.be.true;
      expect(mqtt.validPattern('#/foo')).to.be.true;
      expect(mqtt.validPattern('foo/#')).to.be.true;
      expect(mqtt.validPattern('foo/#/baz')).to.be.true;
      expect(mqtt.validPattern('foo/##/baz')).to.be.false;
      expect(mqtt.validPattern('++/foo/baz')).to.be.false;
      expect(mqtt.validPattern('for/Ba#R//baz')).to.be.false;
      expect(mqtt.validPattern('/for/B+aR//baz/')).to.be.false;
    });
    it('checks is a pattern', function() {
      expect(mqtt.isPattern('')).to.be.true;
      expect(mqtt.isPattern('+/foo')).to.be.true;
      expect(mqtt.isPattern('foo/bar')).to.be.false;
    });

  });

});
