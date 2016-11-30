(function() {
    'use strict';

    angular.module('shop')
        .factory('SigninService', SigninService);

    function SigninService() {

        return {
            login: login
        };

        function login(loginInfo) {
            this.loginData = {
                username: loginInfo,
                time: new Date()
            };
        }
    }
}());
