(function() {
    'use strict';

    angular.module('shop')
        .factory('SigninService', SigninService);


    /**
     * Signin Service constructor with login functionality
     */
    function SigninService() {
        return {
            login: login,
        };

        function login(user) {
            var loginData = {
                username: user,
                time: new Date()
            };
            return loginData;
        }
    }
}());
