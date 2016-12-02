(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('inventory controller', function() {
        var mockLocalStorageService = {};
        var InventoryController;

        beforeEach(module('shop'));

        beforeEach(module(function($provide) {
            $provide.value('LocalStorageService', mockLocalStorageService);
        }));

        beforeEach(inject(function($controller) {

            mockLocalStorageService.getLocalStorage = function() {
                return [{
                    id:2323,
                    name:'banana',
                    price:22,
                    quantity:2,
                    color:'yellow',
                    discount:4
                }];
            };

            mockLocalStorageService.addToLocalStorage = function(argOne) {
                mockLocalStorageService.add.numTimesCalled++;
                mockLocalStorageService.add.lastArgument =  argOne;
            };

            mockLocalStorageService.inventory = mockLocalStorageService.getLocalStorage;
            InventoryController = $controller('InventoryController');
        }));

        it('should have correct scope variables', function() {
            expect(InventoryController.tax).to.be.a('number');
            expect(InventoryController.uk).to.be.a('boolean');
            expect(InventoryController.currency).to.be.a('string');
            expect(InventoryController.newItem).to.be.an('object');
            expect(InventoryController.formShow).to.be.a('boolean');
            expect(InventoryController.sortBy).to.be.a('string');
            expect(InventoryController.reverse).to.be.a('boolean');
            var inventory = InventoryController.inventory();
            expect(inventory).to.be.an('array');
            expect(inventory.length).to.equal(1);
            expect(Object.keys(inventory[0]).length).to.equal(6);
        });
    });
}());
