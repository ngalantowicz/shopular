(function() {
    'use strict';

    angular.module('shop')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['SigninService'];

    function LoginController(signIn) {
        this.loginData = signIn.login();
    }
}());
