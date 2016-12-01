(function() {
    'use strict';

    angular.module('shop')
        .factory('TaxService', TaxService);

    /**
     * Tax constructor used to calculate tax rates
     */
    function TaxService() {
        return {
            getTaxRate: getTaxRate,
            getZipCode: getZipCode
        };

        function getZipCode() {
            $http({
                method: 'GET',
                url: 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=57508333-6a93-b1db-b78b-6d8b26dbdf8c&auth-token=E19FLQP2w93FH0xfiNm6',
                dataType: 'json',
                data: [{
                    city: 'll',
                    state: 'gdgdf',
                    },
                    {
                    zipcode: 'fdgdgf',    
                    }],
                headers : {
                    'Content-Type': 'aplication/json',
                    'Host': 'us-zipcode.api.smartystreets.com'
                }
            });
        }

        function getTaxRate() {

        }
    }
}());
