angular.module('app.services', [])

    .factory('fetchKPIData', function ($http) {
        return {
            getLatestValue: function () {
                return $http.get("/data") ;
            }
        }
    })


.service('BlankService', [function(){

}]);

