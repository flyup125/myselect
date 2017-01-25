(function() {
	'use strict';

	angular.module('myselect', [
		'ui.bootstrap'
	])
	.controller('MySelectCtrl', ['$scope', function($scope) {
		$scope.myOptions = [1, 2, 3, 4];
		$scope.test = 1;

		$scope.myOptions1 = [1, 2, 3, 4];
		$scope.test1 = [2, 3];

		$scope.monthes = [
			{title: 'Jan', value: 1},
			{title: 'Feb', value: 2},
			{title: 'Mar', value: 3},
			{title: 'Apr', value: 4},
			{title: 'May', value: 5},
			{title: 'Jun', value: 6},
			{title: 'Jul', value: 7},
			{title: 'Aug', value: 8},
			{title: 'Sep', value: 9},
			{title: 'Oct', value: 10},
			{title: 'Nov', value: 11},
			{title: 'Dec', value: 12},
		];
		$scope.test2 = 1;

		$scope.monthes1 = {
			1: 'Jan',
			2: 'Feb',
			3: 'Mar',
			4: 'Apr',
			5: 'May',
			6: 'Jun',
			7: 'Jul',
			8: 'Aug',
			9: 'Sep',
			10: 'Oct',
			11: 'Nov',
			12: 'Dec'
		};
		$scope.test3 = [3, 5];

		$scope.test4 = 'all';
	}]);

})();
