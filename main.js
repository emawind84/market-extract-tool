/// <reference path="typings/angularjs/angular.d.ts" />
(function ($){
    "use strict";

    var market = angular.module('market', []);
    market.controller('MarketController', ['$scope', '$window', '$log', 'saveData', function($scope, $window, $log, saveData){
        $scope.querydata = {
            site: '11st',
            content: ''
        };

        $scope.saveData = function(){
            saveData($scope.result);
        }
        
        $scope.parseData = function(query){
            //$log.debug(query);
            var result = $window.extractData[query.site](query.content);
            //$log.debug(result);
            $scope.result = result;
        };
        
    }]);

    market.factory('saveData', ['$log', '$http', function ($log, $http) {
        return function (data) {
            $http({
                url: '/bestmarket',
                data: {
                    type: '11st',
                    list: JSON.stringify( data )
                },
                method: 'PUT'
            }).then(function(response){
                $log.log(response);
            });
        };
    }]);

})(jQuery);