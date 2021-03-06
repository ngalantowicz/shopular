(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('inventory controller', function() {
        var mockLocalStorageService = {};
        var mockTaxService = {};
        var InventoryController;

        beforeEach(module('shop'));

        beforeEach(module(function($provide) {
            $provide.value('LocalStorageService', mockLocalStorageService);
            $provide.value('TaxService', mockTaxService);
        }));

        beforeEach(inject(function($controller) {

            mockLocalStorageService.getInventory = function() {
                return [{
                    id:2323,
                    name:'banana',
                    price:22,
                    quantity:2,
                    color:'yellow',
                    discount:4
                }];
            };

            mockLocalStorageService.itemAdd = function(argOne) {
                mockLocalStorageService.itemAdd.numTimesCalled++;
                mockLocalStorageService.itemAdd.lastArgument =  argOne;
            };

            mockLocalStorageService.itemAdd.numTimesCalled = 0;
            mockLocalStorageService.inventory = mockLocalStorageService.getInventory;
            InventoryController = $controller('InventoryController');
        }));

        describe('scope variables', function() {

            it('should have correct value types', function() {
                expect(InventoryController.tax).to.be.a('number');
                expect(InventoryController.uk).to.be.a('boolean');
                expect(InventoryController.currency).to.be.a('string');
                expect(InventoryController.newItem).to.be.an('object');
                expect(InventoryController.formShow).to.be.a('boolean');
                expect(InventoryController.sortBy).to.be.a('string');
                expect(InventoryController.reverse).to.be.a('boolean');
                expect(InventoryController.showForm).to.be.a('function');
                var inventory = InventoryController.inventory;
                expect(inventory).to.be.an('array');
                expect(inventory.length).to.equal(1);
                expect(Object.keys(inventory[0]).length).to.equal(6);
            });
        });

        describe('showForm fn', function() {

            it('should update formShow variable when passed a boolean', function() {
                var form = InventoryController.formShow;
                expect(form).to.equal(false);
                InventoryController.showForm(true);
                var trueForm = InventoryController.formShow;
                expect(trueForm).to.equal(true);
            });

            it('should return undefined if !boolean is passed', function() {
                var faultyForm = InventoryController.showForm('true');
                var faultyForm2 = InventoryController.showForm({boolean: 'true'});
                expect(faultyForm).to.equal(undefined);
                expect(faultyForm2).to.equal(undefined);
            });
        });

        describe('customer fn', function() {

            it('should update uk and currency scope variable when passed boolean', function() {
                var uk = InventoryController.uk;
                var currency = InventoryController.currency;
                expect(uk).to.equal(false);
                expect(currency).to.equal('USD $');
                InventoryController.customer(true);
                var trueUk = InventoryController.uk;
                var ukCurrency = InventoryController.currency;
                expect(trueUk).to.equal(true);
                expect(ukCurrency).to.equal('UBP $');
            });

            it('should return undefined when is passed !boolean', function() {
                var faultyCustomer = InventoryController.customer('true');
                var faultyCustomer2 = InventoryController.customer({});
                var faultyCustomer3 = InventoryController.customer();
                expect(faultyCustomer).to.equal(undefined);
                expect(faultyCustomer2).to.equal(undefined);
                expect(faultyCustomer3).to.equal(undefined);
            });
        });

        describe('getPrice fn', function() {

            it('should return a number when getPrice fn is passed an object', function() {
                var price = InventoryController.getPrice({
                                id:2323,
                                name:'banana',
                                price:22,
                                quantity:2,
                                color:'yellow',
                                discount:4
                            });
                expect(price).to.be.a('number');
                expect(price).to.equal((22-4)+((22-4)*InventoryController.tax));
            });

            it('should return a uk tax rate based number when getPrice fn is passed an object', function() {
                InventoryController.customer(true);
                var ukPrice = InventoryController.getPrice({
                                id:2323,
                                name:'banana',
                                price:22,
                                quantity:2,
                                color:'yellow',
                                discount:4
                            });
                expect(ukPrice).to.equal(((22-4)+((22-4)*InventoryController.tax))*1.5);
            });

            it('should return undefined if object with !price keys are passed in', function() {
                var noPrice = InventoryController.getPrice({
                                id:2323,
                                name:'banana',
                                quantity:2,
                                color:'yellow',
                                discount:4
                            });
                expect(noPrice).to.equal(undefined);
            });


            it('should return undefined if object is empty', function() {
                var emptyObj = InventoryController.getPrice({});
                expect(emptyObj).to.equal(undefined);
            });
        });

        describe('getName fn', function() {

            it('should return a string when passed an object based of scope variable this.uk', function() {
                var name = InventoryController.getName({
                                id:2323,
                                name:'banana',
                                price: 24,
                                quantity: 2,
                                color:'yellow',
                                discount: 4
                            });
                expect(name).to.be.a('string');
                expect(name).to.equal('banana');
                InventoryController.customer(true);
                var ukName = InventoryController.getName({
                                id:2323,
                                name:'waste basket',
                                price: 24,
                                quantity: 2,
                                color:'yellow',
                                discount: 4
                            });
                expect(ukName).to.equal('rubbish bin');
            });

            it('should return undefined if object !name and object is empty', function() {
                var noName = InventoryController.getName({
                                id:2323,
                                price: 24,
                                quantity: 2,
                                color:'yellow',
                                discount: 4
                            });
                expect(noName).to.equal(undefined);
                var emptyObj = InventoryController.getName({});
                expect(emptyObj).to.equal(undefined);
            });
        });

        describe('itemAdd fn', function() {

            it('should add new stock item to inventory in localStorage', function() {

                InventoryController.itemAdd({
                                id:23,
                                name:'waste basket',
                                price: 5,
                                quantity: 21,
                                color:'black',
                                discount: 1
                            });
                expect(mockLocalStorageService.itemAdd.numTimesCalled).to.equal(1);
                expect(mockLocalStorageService.itemAdd.lastArgument).to.be.an('object');
                expect(Object.keys(mockLocalStorageService.itemAdd.lastArgument).length).to.equal(6);
                expect(mockLocalStorageService.itemAdd.lastArgument).to.include.keys('id', 'name', 'price', 'quantity', 'color', 'discount');

            });

            it('should clear newItem obj that is used with ng-model', function() {
                InventoryController.newItem = {name: 'nick', discount: 2, quantity: 21, color: 'brown'};
                InventoryController.itemAdd({
                    id:23,
                    price: 5,
                    name: 'banana',
                    quantity: 21,
                    color:'black',
                    discount: 1
                });
                expect(Object.keys(InventoryController.newItem).length).to.equal(0);
            });

            it('should return undefined if passed object has no name key', function() {
                var faultyObj = InventoryController.itemAdd({
                                id:23,
                                price: 5,
                                quantity: 21,
                                color:'black',
                                discount: 1
                            });
                expect(faultyObj).to.equal(undefined);
            });

            it('should return undefined if passed string', function() {
                var faultyObj = InventoryController.itemAdd('nick');
                expect(faultyObj).to.equal(undefined);
            });

            it('should return undefined if passed number', function() {
                var faultyObj = InventoryController.itemAdd(14);
                expect(faultyObj).to.equal(undefined);
            });
        });
    });
}());
