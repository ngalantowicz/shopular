(function() {
    'use strict';

    angular.module('shop')
        .controller('InventoryController', InventoryController);

    InventoryController.$inject = ['LocalStorageService', 'TaxService'];

        /**
         * Builds controller in shop module for template manipulation
         */
        function InventoryController(LSservice, taxService) {

            this.tax = 0.0575;
            this.uk = false;
            this.currency = 'USD $';
            this.newItem = {};
            this.formShow = false;
            this.sortBy = 'price';
            this.reverse = false;

            console.log(LSservice);

            this.inventory = LSservice.inventory;
            this.taxRate = {};


            this.newTaxRate = function newTaxRate(location) {
                taxService.getTaxRate(location);
            };
            /**
             * Switch for form and table views
             * @param  {Boolean} boolean sets switch to true or false
             * @return {void}
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
             * @param  {Boolean} boolean sets switch to true or false
             * @return {void}
             */
            this.customer = function customer(boolean){
                if (boolean) {
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
                    if (this.uk) {
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
                var ukName = 'rubbish bin';
                if (this.uk) {
                    if (item.name === 'waste basket') {
                        return ukName;
                        //Quick Note: If i dont change the inventory data, my alphabetic sort order will not be correct...
                    }
                }
                return item.name;
            };

            /**
             * Creates new item in inventory data array
             * @param  {Object} item new stock in inventory
             * @return {void}
             */
            this.itemAdd = function itemAdd(item) {
                item.price = Number(item.price);
                item.discount = Number(item.discount);
                item.quantity = Number(item.quantity);

                if (typeof(item.price) !== 'number' || !item.price) {
                    item.price = 0;
                }
                if (typeof(item.discount) !== 'number' || !item.discount) {
                    item.discount = 0;
                }
                if (typeof(item.quantity) !== 'number' || !item.quantity) {
                    item.quantity = 0;
                }
                this.inventory.push({
                    id: Math.ceil(Math.random()*1000),
                    name: item.name,
                    price: (item.price),
                    quantity: item.quantity,
                    color: item.color,
                    discount: (item.discount)
                });
                LSservice.addToLocalStorage(this.inventory);
                this.newItem = {};
            };

            /**
             * sets paramater for data table sort
             * @param  {String} sort paramater for data sort
             * @return {void}
             */
            this.sortOrder = function sortOrder(sort){
                if (this.sortBy === sort) {
                    this.sortBy = '-' + sort;
                }   else {
                    this.sortBy = sort;
                }
            };

        }

}());
