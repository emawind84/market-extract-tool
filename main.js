(function ($){
	"use strict";
	
	var market = angular.module('market', []);
	market.controller('MarketController', ['$scope', '$window', '$log', function($scope, $window, $log){
		$scope.querydata = {
			site: '11st',
			content: ''
		};
		
		$scope.exportData = function(query){
			//$log.debug(query);
			var result = $window.extractData[query.site](query.content);
			//$log.debug(result);
			$scope.result = result;
		};
		
	}]);

})(jQuery);