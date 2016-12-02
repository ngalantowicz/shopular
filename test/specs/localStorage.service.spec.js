(function() {
    'use strict';

    var expect = window.chai.expect;

    describe('localService service', function() {
        var LocalStorageService;

        beforeEach(module('shop'));

        beforeEach(inject(function(_LocalStorageService_) {
            LocalStorageService = _LocalStorageService_;
        }));

        describe('getInventory fn', function() {

            it('should have return default inventory', function() {
                var inventory =  LocalStorageService.getInventory();
                expect(inventory).to.be.an('array');
                expect(inventory.length).to.equal(12);
                expect(Object.keys(inventory[0]).length).to.equal(6);
            });
        });

        describe('itemAdd fn', function() {
            it('should push new item into inventory', function() {
                LocalStorageService.itemAdd({
                    name: 'banana',
                    price: 5,
                    quantity: 5,
                    color: 'yellow',
                    discount: 0
                });
                var inventory =  LocalStorageService.getInventory();
                expect(inventory.length).to.equal(13);
                expect(inventory[12].name).to.equal('banana');
            });
        });
    });
}());
