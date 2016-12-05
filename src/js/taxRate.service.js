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
            return $http({
                method: 'GET',
                url: 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=57508333-6a93-b1db-b78b-6d8b26dbdf8c&auth-token=E19FLQP2w93FH0xfiNm6&city='+ city +'&state='+ state +'&zipcode=',
                dataType: 'json'
            });
        }


        /**
         * calls API to recieve tax rate based on state and zipcode
         * @param  {String} zipcode Zipcode used for api query
         * @return {Promise}         Functions to handle resolved data
         */
        function taxRate(zipcode) {
            return $http({
                method: 'GET',
                url: 'https://api.taxjar.com/v2/rates/' + zipcode,
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer c9697bba747ae081436339b488940437'
                }
            });
        }
    }
}());
