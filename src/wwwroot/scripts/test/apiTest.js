var api = require('../src/api');
var assert = require('assert');
var sinon = require('sinon');
var sinonTest = require('sinon-test');

sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

describe('api', function() {
    it('should have a getToken() Function', function() {
        assert.ok(typeof api.default.getToken == 'function', 'getToken function not found');
    });

    it('should have an addBudget() function', function() {
        assert.ok(typeof api.default.addBudget == 'function', 'addBudget function not found');
    });

    describe('addBudget', function() {
        it('should get the added budget object with an id', sinon.test(function() {
            //assert.ok(true, true);
        }));
    });
});