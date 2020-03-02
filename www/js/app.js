angular.module("lethabo_mo", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","ngMap","lethabo_mo.controllers", "lethabo_mo.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Lethabo Mo" ;
		$rootScope.appLogo = "data/images/header/logo1.png" ;
		$rootScope.appVersion = "0.0.1" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_main_menu = false ;
		$rootScope.hide_menu_about_me = false ;
		$rootScope.hide_menu_portfolio = false ;
		$rootScope.hide_menu_contact_me = false ;
		$rootScope.hide_menu_help = false ;
		$rootScope.hide_menu_terms_and_conditions = false ;
		$rootScope.hide_menu_faqs = false ;
		$rootScope.hide_menu_location = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "lethabo_mo",
				storeName : "lethabo_mo",
				description : "The offline datastore for Lethabo Mo app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirm Exit",
					template: "Are you sure you want to exit?"
				});
				confirmPopup.then(function (close){
					if(close){
						ionic.Platform.exitApp();
					}
				});
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("lethabo_mo",{
		url: "/lethabo_mo",
			abstract: true,
			templateUrl: "templates/lethabo_mo-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("lethabo_mo.about_me", {
		url: "/about_me",
		cache:false,
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-about_me.html",
						controller: "about_meCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.about_us", {
		url: "/about_us",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.contact_me", {
		url: "/contact_me",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-contact_me.html",
						controller: "contact_meCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.dashboard", {
		url: "/dashboard",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.faqs", {
		url: "/faqs",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.location", {
		url: "/location",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-location.html",
						controller: "locationCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.menu_one", {
		url: "/menu_one",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-menu_one.html",
						controller: "menu_oneCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.menu_two", {
		url: "/menu_two",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-menu_two.html",
						controller: "menu_twoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.portfolio", {
		url: "/portfolio",
		cache:false,
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-portfolio.html",
						controller: "portfolioCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lethabo_mo.terms_and_conditions", {
		url: "/terms_and_conditions",
		views: {
			"lethabo_mo-side_menus" : {
						templateUrl:"templates/lethabo_mo-terms_and_conditions.html",
						controller: "terms_and_conditionsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/lethabo_mo/dashboard");
});
