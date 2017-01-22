const Mqtt = require('../index').Matcher;
var expect    = require('chai').expect;

describe('Mqtt Topix Matcher', function() {
  describe('Topic testing', function() {
    it('tests simple topics', function() {
      var mqtt = Mqtt('foo/bar');
      expect(mqtt.test('foo/bar')).to.be.true;
      expect(mqtt.test('foo//bar')).to.be.false;
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('bar')).to.be.false;
      expect(mqtt.test('baz')).to.be.false;
    });
    it('tests simple topicpatterns with single +', function() {
      var mqtt = Mqtt('+');
      expect(mqtt.test('foo')).to.be.true;
      expect(mqtt.test('foo/bar')).to.be.false;
      expect(mqtt.test('bar/foo')).to.be.false;
    });
    it('tests simple topicpatterns with + in the middle', function() {
      var mqtt = Mqtt('foo/+/bar');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('foo/bar')).to.be.false;
      expect(mqtt.test('foo//bar')).to.be.true;
      expect(mqtt.test('foo/baz/bar')).to.be.true;
    });
    it('tests simple topicpatterns with + in the begin', function() {
      var mqtt = Mqtt('+/bar/baz');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('bar/baz')).to.be.false;
      expect(mqtt.test('/bar/baz')).to.be.true;
      expect(mqtt.test('foo/bar/baz')).to.be.true;
      expect(mqtt.test('test/foo/bar/baz')).to.be.false;
    });
    it('tests simple topicpatterns with + in the end', function() {
      var mqtt = Mqtt('foo/bar/+');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('foo/bar')).to.be.false;
      expect(mqtt.test('foo/bar/')).to.be.true;
      expect(mqtt.test('foo/bar/baz')).to.be.true;
      expect(mqtt.test('foo/bar/baz/test')).to.be.false;
    });
    it('tests simple topicpatterns with single #', function() {
      var mqtt = Mqtt('#');
      expect(mqtt.test('foo')).to.be.true;
      expect(mqtt.test('foo/')).to.be.true;
      expect(mqtt.test('bar/foo')).to.be.true;
      expect(mqtt.test('/bar/foo/')).to.be.true;
    });
    it('tests simple topicpatterns with # in the middle', function() {
      var mqtt = Mqtt('foo/#/bar');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('foo/bar')).to.be.false;
      expect(mqtt.test('foo//bar')).to.be.true;
      expect(mqtt.test('foo/baz/bar')).to.be.true;
      expect(mqtt.test('foo/baz/bar/bar')).to.be.true;
    });
    it('tests simple topicpatterns with # in the begin', function() {
      var mqtt = Mqtt('#/bar/baz');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('bar/baz')).to.be.false;
      expect(mqtt.test('/bar/baz')).to.be.true;
      expect(mqtt.test('foo/bar/baz')).to.be.true;
      expect(mqtt.test('test/foo/bar/baz')).to.be.true;
    });
    it('tests simple topicpatterns with + in the end', function() {
      var mqtt = Mqtt('foo/bar/#');
      expect(mqtt.test('foo')).to.be.false;
      expect(mqtt.test('foo/bar')).to.be.false;
      expect(mqtt.test('foo/bar/')).to.be.true;
      expect(mqtt.test('foo/bar/baz')).to.be.true;
      expect(mqtt.test('foo/bar/baz/test')).to.be.true;
    });

  });
  describe('Topic matching', function() {
    it('matches simple topics', function() {
      var mqtt = Mqtt('foo/bar');
      let result = mqtt.match('foo/bar');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(0);
    });
    it('matches topics with multiple +', function() {
      var mqtt = Mqtt('+/+/+');
      let result = mqtt.match('foo/bar/baz');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('bar');
      expect(result[2]).to.be.equal('baz');
    });
    it('matches topics with single #', function() {
      var mqtt = Mqtt('#');
      let result = mqtt.match('foo/bar/baz');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(1);
      expect(result[0]).to.be.equal('foo/bar/baz');

    });
    it('matches topics with multiple #', function() {
      var mqtt = Mqtt('#/#/#');
      let result = mqtt.match('foo/bar/baz');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('bar');
      expect(result[2]).to.be.equal('baz');
      result = mqtt.match('foo//baz');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('');
      expect(result[2]).to.be.equal('baz');
      result = mqtt.match('foo/bar/baz/test');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('bar');
      expect(result[2]).to.be.equal('baz/test');
    });
    it('matches topics with mixed # und +', function() {
      var mqtt = Mqtt('#/+/#');
      let result = mqtt.match('foo/bar/baz/test');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('bar');
      expect(result[2]).to.be.equal('baz/test');
      result = mqtt.match('foo//baz');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('');
      expect(result[2]).to.be.equal('baz');
      var mqtt = Mqtt('+/#/+');
      result = mqtt.match('foo/bar/baz/test');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(3);
      expect(result[0]).to.be.equal('foo');
      expect(result[1]).to.be.equal('bar/baz');
      expect(result[2]).to.be.equal('test');
    });
    it('does not have the bug of mqtt-regex package', function() {
      var mqtt = Mqtt('foo/#');
      let result = mqtt.match('foo/bar/baz/test');
      expect(result).not.to.be.null;
      expect(result.length).to.be.equal(1);
      expect(result[0]).to.be.equal('bar/baz/test');
      result = mqtt.match('foo2/bar/baz/test');
      expect(result).to.be.null;
    });

  });
});
