(function (global) {
	var AppsFlyer;
	AppsFlyer = function () {
	};

	AppsFlyer.prototype.initSdk = function (args) {
    	cordova.exec(null, null, "AppsFlyerPlugin", "initSdk", args);
	};
	
	AppsFlyer.prototype.setCurrencyCode = function (currencyId) {
		var options;
		options = {};
		options.currencyId = currencyId;
    	cordova.exec(null, null, "AppsFlyerPlugin", "setCurrencyCode", [options.currencyId]);
	};
	
	AppsFlyer.prototype.setAppUserId = function (customeUserId) {
		var options;
		options = {};
		options.customeUserId = customeUserId;
    	cordova.exec(null, null, "AppsFlyerPlugin", "setAppUserId", [options.customeUserId]);
	};

	AppsFlyer.prototype.getAppsFlyerUID = function (callbackFn) {
    	cordova.exec(function(result){
    		callbackFn(result);
    	}, null,
    	"AppsFlyerPlugin",
    	"getAppsFlyerUID",
    	[]);
	};
	
	AppsFlyer.prototype.sendTrackingWithEvent = function(eventName, eventValue) {
		var options;
		options = {};
		options.eventName = eventName;
		options.eventValue = eventValue;
    	cordova.exec(null, null, "AppsFlyerPlugin", "sendTrackingWithEvent", [options.eventName,options.eventValue]);
	};

	AppsFlyer.prototype.onInstallConversionDataLoaded = function(conversionData) {
		var data = JSON.parse(conversionData);
		var event = new CustomEvent('onInstallConversionDataLoaded', {'detail': data});
		global.document.dispatchEvent(event);
	};

	global.cordova.addConstructor(function() {
		if (!global.Cordova) {
			global.Cordova = global.cordova;
		};

		if (!global.plugins) {
			global.plugins = {};
		}

		global.plugins.appsFlyer = new AppsFlyer();
	});
}(window));

document.addEventListener('onInstallConversionDataLoaded', function(e){
	console.log(e.detail);
	alert(JSON.stringify(e.detail));
}, false);

document.addEventListener("deviceready", function(){
    var args = [];
    var devKey = "vvAQEVLxSjKAVBmGLqcmu8";  // your AppsFlyer devKey
    args.push(devKey);
    var userAgent = window.navigator.userAgent.toLowerCase();
                          
    if (/iphone/.test( userAgent )) {
        var appId = "123456789";            // your ios app id in app store
        args.push(appId);
    }
	window.plugins.appsFlyer.initSdk(args);
}, false);

