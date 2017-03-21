var api = require('../src/api');
var assert = require('assert');
describe('api', function() {
    it('should have a getToken() Function', function() {
        assert.ok(typeof api.default.getToken == 'function');
    });
});