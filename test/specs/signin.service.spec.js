(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('SigninService service', function() {
        var SigninService;

        beforeEach(module('shop'));

        beforeEach(inject(function(_SigninService_) {
            SigninService = _SigninService_;
        }));

        describe('login fn', function() {
            it('should return object when passed user string', function() {
                var login = SigninService.login('nick');
                expect(login).to.be.an('object');
                expect(login).to.include.keys('username', 'time');
                expect(login.username).to.equal('nick');
            });

        });
    });




}());
