(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('login service', function() {
        var SigninService;
        var mockSigninService = {};

        beforeEach(module('shop'));

        beforeEach(module(function($provide) {
            $provide.value('LoginController', mockSigninService);
        }));

        beforeEach(inject(function($controller) {
            mockSigninService.login = function(user) {
                return {
                    username: user,
                    time: new Date()
                };
            };
            SigninService = $controller('SigninService');
        }));

        describe('login fn', function() {
            it('should return login object', function() {
                var loginObj = SigninService.login('nick');
                expect(loginObj).to.be.an('object');

            });
        });
    });
}());
