(function() {
    'use strict';

    angular.module('shop')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['SigninService'];

    function LoginController(signIn) {
        this.user = {};
        this.loggedin = false;
        this.login = function login(user){
            return signIn.login(user);
        };
    }
}());
