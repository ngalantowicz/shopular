(function() {
    'use strict';

    angular.module('shop')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['SigninService'];

    /**
     * Takes in username and passes data to Dom and Service
     * @param {String} signIn name of app user
     * @return {Object} the username and time signed in
     */
    function LoginController(signIn) {
        this.user = {};
        this.loggedin = false;
        this.login = function login(user){
            if (typeof(user) === 'object' || !user) {
                return;
            }
            return signIn.login(user);
        };
    }
}());
