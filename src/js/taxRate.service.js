(function() {
    'use strict';

    angular.module('shop')
        .factory('TaxService', TaxService);

    TaxService.$inject = ['$http'];
    /**
     * Tax constructor used to calculate tax rates
     */
    function TaxService($http) {
        return {
            getTaxRate: getTaxRate,
            taxRate: taxRate
        };

        /**
         * Calls smartstreet Api to recieve zipcode data based of city and state
         * @param  {Object} location city and state used in query string
         * @return {Promise}         Functions to handle resolved data
         */
        function getTaxRate(location) {
            var state = location.state;
            var city = location.city;
            $http({
                method: 'GET',
                url: 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=57508333-6a93-b1db-b78b-6d8b26dbdf8c&auth-token=E19FLQP2w93FH0xfiNm6&city='+ city +'&state='+ state +'&zipcode=',
                dataType: 'json',
                headers : {
                    'Content-Type': 'aplication/json'
                }
            }).then( function handleSuccess(zipData){
                console.log(zipData);
                var zipcode = zipData.data[0].zipcodes[0].zipcode;
                return taxRate(zipcode);
            }).then( function handleSecondSuccess(rateData){
                console.log('rate in chain', rateData);
            });
        }

        /**
         * calls API to recieve tax rate based on state and zipcode
         * @param  {Strin} state   State used for api query
         * @param  {String} zipcode Zipcode used for api query
         * @return {Promise}         Functions to handle resolved data
         */
        function taxRate(zipcode) {
            return $http({
                method: 'GET',
                url: 'https://taxrates.api.avalara.com:443/postal?country=usa&postal='+ zipcode,
                dataType: 'json',
                headers: {
                    'Authorization': 'AvalaraApiKey RStltT3vmx3opmsghkoIA//8mVThxoGURGwF0pYacxmO20UW66XPK49niaG0hZl689TJIrx5W2TCXhNy2KVEdw=='
                }
            }). then( function handleSuccess(data){
                console.log('rate in fn', data);
            });
        }
    }
}());
