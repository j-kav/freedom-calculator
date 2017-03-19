var apiinstance = require('../src/api');
var assert = require('assert');
describe('apiinstance', function() {
    it('should be an instance of api', function() {
        assert.ok(apiinstance instanceof Array);
    });
});