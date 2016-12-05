(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('login service', function() {
        var LoginController;
        var mockSigninService = {};

        beforeEach(module('shop'));

        beforeEach(module(function($provide) {
            $provide.value('SigninService', mockSigninService);
        }));

        beforeEach(inject(function($controller) {
            mockSigninService.login = function(user) {
                if (!user) {
                    return;
                }
                return {
                    username: user,
                    time: new Date()
                };
            };
            LoginController = $controller('LoginController');
        }));

        describe('scope variables', function() {
            it('should equal 3 and be function obj and boolean', function() {
                expect(LoginController.user).to.be.an('object');
                expect(Object.keys(LoginController.user).length).to.equal(0);
                expect(LoginController.loggedin).to.be.a('boolean');
                expect(LoginController.loggedin).to.equal(false);
            });
        });

        describe('login fn', function() {

            it('should return login object', function() {
                var loginObj = LoginController.login('nick');
                expect(loginObj).to.be.an('object');
                expect(loginObj.username).to.equal('nick');
                expect(loginObj).to.include.keys('time', 'username');
            });

            it('should return undefined if passed no arguments or object', function() {
                var loginObj = LoginController.login();
                expect(loginObj).to.equal(undefined);
                var loginObj2 = LoginController.login({username: 'nick'});
                expect(loginObj2).to.equal(undefined);
            });
        });
    });
}());
