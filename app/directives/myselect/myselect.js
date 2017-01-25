(function() {
	'use strict';

	angular.module('myselect')
		.directive('myselect', ['$timeout', '$parse', function($timeout, $parse) {
			return {
				restrict: 'E',
				replace: true,
				transclude: true,
				scope: true,
				templateUrl: 'app/directives/myselect/myselect.html',
				link: function(scope, element, attrs) {
					scope.multiple = attrs.multiple === undefined ? false : true;
					scope.ngModel = scope.$parent[attrs.ngModel];

					var regex = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)?$/;
					var regex1 = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+\(\s*(?:([\$\w][\$\w\d]*))\s*,\s*(?:([\$\w][\$\w\d]*))\s*\)\s+in\s+([\s\S]+?)$/;
					var options = attrs.options;
					var matches;
					var labelFn, valueFn, keyName, valueName, collection;

					if(options) {
						if(matches = options.match(regex)) {
							labelFn = $parse(matches[2] || matches[1]);
							valueName = matches[3];
							valueFn = $parse(matches[2] ? matches[1] : valueName);
							collection = scope.$parent.$eval(matches[4]);
						} else if(matches = options.match(regex1)) {
							labelFn = $parse(matches[2] || matches[1]);
							keyName = matches[3];
							valueName = matches[4];
							valueFn = $parse(matches[2] ? matches[1] : valueName);
							collection = scope.$parent.$eval(matches[5]);
						} else {
							throw new Error('Invalid expression format for options.');
						}

						if(matches) {
							scope.options = [];
							angular.forEach(collection, function(entry, index) {
								var locals = {};

								locals[keyName] = index;
								locals[valueName] = entry;

								scope.options.push({
									value: valueFn(scope, locals),
									label: labelFn(scope, locals),
								});
							});
						}
					}

					element.on('click', 'li.myoption', function(event) {
						var target = angular.element(event.target);

						if(scope.multiple) {
							target.toggleClass('active');
							
							scope.ngModel = scope.$parent[attrs.ngModel] = [];
							element.find('li.myoption.active').each(function() {
								var value = angular.element(this).attr('value');

								scope.ngModel.push(value ? value : angular.element(this).text().trim());
							});

							scope.$apply();

							return false;
						} else {
							element.find('li.myoption.active').removeClass('active');
							target.addClass('active');

							var value = target.attr('value');
							scope.ngModel = scope.$parent[attrs.ngModel] = value ? value : target.text().trim();
							scope.ngModelLabel = target.text().trim();

							scope.$apply();
						}
					});

					$timeout(function() { 
						if(scope.multiple) {
							angular.forEach(scope.ngModel, function(value) {
								element.find('li.myoption[value="' + value + '"]').addClass('active');
							});
						} else {
							var target = element.find('li.myoption[value="' + scope.ngModel + '"]');

							scope.ngModelLabel = target.text().trim();
							target.addClass('active');
						}
					}, 50);
				}
			};
		}])
		.directive('myoption', function() {
			return {
				restrict: 'E',
				replace: true,
				transclude: true,
				scope: {
					value: '='
				},
				template: '<li class="myoption" ng-value="value"><ng-transclude></ng-transclude></li>'
			};
		});;

})();
