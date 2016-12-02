(function() {
    'use strict';

    angular.module('shop')
        .factory('LocalStorageService', LocalStorageService);

    /**
     * Constructor Function for LocalStorage Service
     * @return {Object} the functions and variables passed to controller
     */
    function LocalStorageService() {

        var inventory = [
                          { "id": 2957, "name": "widget", "price": 32, "quantity": 203, "color": "red", "discount": 31 },
                          { "id": 89274, "name": "golf club", "price": 98, "quantity": 10, "color": "black", "discount": 0 },
                          { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "white", "discount": 0 },
                          { "id": 87363, "name": "bonzai tree", "price": 76, "quantity": 2, "color": "green", "discount": 0 },
                          { "id": 1736, "name": "towel", "price": 55, "quantity": 30, "color": "brown", "discount": 10 },
                          { "id": 4836, "name": "dog bed", "price": 99, "quantity": 10, "color": "beige", "discount": 50 },
                          { "id": 829, "name": "waste basket", "price": 15, "quantity": 40, "color": "silver", "discount": 0 },
                          { "id": 46, "name": "guitar", "price": 899, "quantity": 0, "color": "blue", "discount": 150 },
                          { "id": 17456, "name": "matcha tea", "price": 42, "quantity": 4, "color": "green", "discount": 11 },
                          { "id": 3292, "name": "enlightenment", "price": 99999, "quantity": 1, "color": "red", "discount": 0 },
                          { "id": 533, "name": "eggs", "price": 5, "quantity": 12, "color": "brown", "discount": 1 },
                          { "id": 683, "name": "pillow", "price": 27, "quantity": 10, "color": "black", "discount": 12 }
                        ];

        return {
            getInventory: getInventory,
            addToLocalStorage: addToLocalStorage,
            itemAdd: itemAdd
        };


        /**
         * Creates new item in inventory data array
         * @param  {Object} item new stock in inventory
         * @return {void}
         */
        function itemAdd(item) {
            item.price = Number(item.price);
            item.discount = Number(item.discount);
            item.quantity = Number(item.quantity);

            console.log('inventory', inventory);

            inventory.push({
                id: Math.ceil(Math.random()*1000),
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                discount: item.discount
            });
            addToLocalStorage(inventory);
        }

        /**
         * Gets all inventory data in LocalStorage
         * @return {Array} inventory array with all LocalStorage Objects
         */
        function getInventory() {
            var localStorage = JSON.parse(window.localStorage.getItem('inventory'));
            if(localStorage) {
                return localStorage;
            } else {
                return inventory;
            }
        }

        /**
         * adds new stock items to inventory in LocalStorage
         * @param {Array} newStockItem item to add to localStorage
         * @return {void}
         */
        function addToLocalStorage(newInventory) {
            window.localStorage.setItem('inventory', angular.toJson(newInventory));
        }
    }
}());
