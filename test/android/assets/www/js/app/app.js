(function(){
	angular.module('af-demo-app', ['ngRoute']);

	angular.module('af-demo-app').config(function($routeProvider){
		$routeProvider
			.when('/', {
			    templateUrl: 'templates/page1.html',
			    controller: 'page1Ctrl',
  		}).otherwise('/');
	});

	angular.module('af-demo-app').controller('page1Ctrl', ['$scope', function($scope){
		$scope.sendEvent = function(eventName, eventValue){
			eventName = "purchase";
			eventValue = "0.99";
			window.plugins.appsFlyer.sendTrackingWithEvent(eventName, eventValue);
		};
		$scope.setCurrency = function(currencyId){
			currencyId = "USD";
			window.plugins.appsFlyer.setCurrencyCode(currencyId);
		};
		$scope.setUserId = function(userAppId) {
			userAppId = "1234567890";
		};
		$scope.getUserId = function() {
			window.plugins.appsFlyer.getAppsFlyerUID(getUserIdCallbackFn);
		};

		var getUserIdCallbackFn = function(id) {
			alert('received id is: ' + id);
		}
	}]);
})();

function sayHello(word) {
	alert(word + " world");
};
