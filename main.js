/// <reference path="typings/angularjs/angular.d.ts" />
(function ($){
    "use strict";

    var market = angular.module('market', []);
    market.controller('MarketController', 
    ['$scope', '$window', '$log', 'bestmarket', function($scope, $window, $log, bestmarket){
        $scope.querydata = {
            site: '11st',
            content: 'I love you!',
            defaultImage: 'resources/angel.jpg'
        };
        $scope.selectedProduct = {};
        $scope.researches = [];

        $scope.sort = {
            propertyName: 'rank',
            reverse: false
        };

        $scope.setResearch = function(r){
            $scope.research = r || 'saved_' + (new Date().format('yyyy-MM-dd_HH:mm:ss'));
        }
        // set a new research by default
        $scope.setResearch();
        
        $scope.saveData = function(){
            bestmarket.save($scope.result, $scope.research).then(function(){
                loadResearches();  // reload researches list
            });
        }

        $scope.searchData = function(query){
            bestmarket.search(query, $scope.research).then(function(response){
                $scope.result = response.data;
                fixDataType();
                //$log.log($scope.result);
            });
        }

        $scope.setSelectedProduct = function(event, data) {
            $scope.selectedProduct = data;
        }
        
        $scope.parseData = function(query){
            //$log.debug(query);
            $scope.result = $window.extractData[query.site](query.content);
            fixDataType();
        };

        var loadResearches = function(){
            bestmarket.loadResearches().then(function(response){
                $scope.researches = response.data;
            });
        }

        var fixDataType = function(){
            angular.forEach($scope.result, function (d) {
                d.rank = parseInt(d.rank);
            });
        }

        loadResearches();
        
    }]);

    market.factory('bestmarket', ['$log', '$http', function ($log, $http) {
        var factory = {};

        factory.loadResearches = function(){
            return $http({
                url: '/bestmarket/types',
                method: 'GET'
            });
        } 

        factory.save = function(data, research){
            return $http({
                url: '/bestmarket',
                data: {
                    type: research || 'none',
                    list: JSON.stringify( data )
                },
                method: 'PUT'
            }).then(function(response){
                $log.log(response);
            });
        };

        factory.search = function(query, research){
            return $http({
                url: '/bestmarket',
                data: {
                    q: query,
                    type: research || 'none'
                },
                method: 'POST'
            });
        }
        
        return factory;

    }]);

})(jQuery);