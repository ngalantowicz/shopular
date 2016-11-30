(function() {
    'use strict';

    angular.module('shop')
        .factory('LocalStorageService', LocalStorageService);

    /**
     * Constructor Function for LocalStorage Service
     * @return {Object} the functions and variables passed to controller
     */
    function LocalStorageService() {
        return {
            getLocalStorage: getLocalStorage,
            addToLocalStorage: addToLocalStorage,


        };
    }

    /**
     * Gets all inventory data in LocalStorage
     * @return {Array} inventory array with all LocalStorage Objects
     */
    function getLocalStorage() {
        var localStorage = JSON.parse(window.getLocalStorage('inventory'));
        return localStorage;
    }

    /**
     * adds new stock items to inventory in LocalStorage
     * @param {Array} newStockItem item to add to localStorage
     * @return {void}
     */
    function addToLocalStorage(newStockItem) {
        var localStorage = JSON.parse(window.getLocalStorage('inventory'));
        localStorage.push(newStockItem);
    }
}());
