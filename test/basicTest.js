var Hook = require('../index.js');
var assert = require('assert');

describe('Contructor', function() {
  it('should read metaData.json and combine it with assets.json and cache is true', function () {
    var hook = new Hook(__dirname + '/fixtures/assets1');

    var expectedResult = require('./fixtures/assets1-meta.json');
    assert.deepEqual(hook.metaData, expectedResult, 'metaData is not correctly loaded');
    assert.equal(hook.cache, true, 'cache is not true by default');
  });
});

describe('getParcelAssets()', function() {
  it('should return the right url', function () {
    var expectedResult =  {
      "script": [
        "123/page1_bundle.js"
      ],
      "style": [
        "123/page1_bundle.css"
      ],
      "image": []
    };

    var hook = new Hook(__dirname + '/fixtures/assets1');
    var result = hook.getParcelAssets('pages/page1');
    assert.deepEqual(result, expectedResult);
  });

  it('should set this.cache=false if options.cache=false', function () {
    var expectedResult =  {
      "script": [
        "123/page1_bundle.js"
      ],
      "style": [
        "123/page1_bundle.css"
      ],
      "image": []
    };

    var hook = new Hook(__dirname + '/fixtures/assets1', {cache: false});

    this.metaData = {};

    var result = hook.getParcelAssets('pages/page1');
    assert.deepEqual(result, expectedResult);
  });

  it('should set this.cache=true if options.cache=true', function () {
    var hook = new Hook(__dirname + '/fixtures/assets1', {cache: true});

    hook.metaData = {
      packageMap: {
        'pages/page1': {}
      }
    };

    var result = hook.getParcelAssets('pages/page1');
    assert.deepEqual(result, {});
  });

});