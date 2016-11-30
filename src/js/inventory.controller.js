(function() {
    'use strict';

    angular.module('shop')
        .controller('inventoryController', inventoryController);

        /**
         * Builds controller in shop module for template manipulation
         */
        function inventoryController() {

            this.tax = 0.0575;
            this.uk = false;
            this.currency = '$';
            this.newItem = {};
            this.formShow = false;
            this.sortBy = 'price';
            this.reverse = false;

            this.inventory = [
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


            /**
             * Switch for form and table views
             * @param  {Boolean} boolean sets switch to true or false
             */
            this.showForm = function showForm(boolean){
                if (boolean === true) {
                    this.formShow = true;
                } else {
                    this.formShow = false;
                }
            };

            /**
             * Switch for uk or usa table view
             * @param  {Boolean} boolean sets switch to true or fals
             */
            this.customer = function customer(boolean){
                if (boolean === true) {
                    this.uk = true;
                    this.currency = 'UBP $';
                } else {
                    this.uk = false;
                    this.currency = 'USD $';
                }
            };

            /**
             * gets correct price for table data
             * @param  {Object} item inventory data
             * @return {Number}      correct price
             */
            this.getPrice = function getPrice(item) {
                    var price;
                    var base = (item.price - item.discount);
                    var tax = (item.price - item.discount) * this.tax;
                    if (this.uk === true) {
                        price = (base + tax) * 1.5;
                    } else {
                        price = (base + tax);
                    }
                    return price;
            };

            /**
             * gets correct item name for appropriate table
             * @param  {Object} item inventory data
             * @return {String}      correct item name
             */
            this.getName = function getName(item) {
                var newItem = null;
                if (this.uk === true) {
                    if (item.name === 'waste basket') {
                        newItem = 'rubbish bin';
                    }
                } else if (newItem !== null) {
                return newItem;
            } else {
                return item.name;
            }
            };

            /**
             * Creates new item in inventory data array
             * @param  {Object} item new stock in inventory
             */
            this.itemAdd = function itemAdd(item) {
                this.inventory.push({
                    id: Math.ceil(Math.random()*1000),
                    name: item.name,
                    price: Number(item.price),
                    quantity: item.quantity,
                    color: item.color,
                    discount: Number(item.discount)
                });
            };

            /**
             * [sortOrder description]
             * @param  {[type]} sort [description]
             * @return {[type]}      [description]
             */
            this.sortOrder = function sortOrder(sort){
                console.log('imin');
                this.sortBy = sort;
                if (this.reverse) {
                    this.reverse = false;
                } else {
                    this.reverse = true;
                }

            };

        }

}());
