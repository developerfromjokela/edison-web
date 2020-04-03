/*
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

var version = "1.0-alpha";
var debug = false;


function lowercase(string) {
    return (typeof string === 'string') ? string.toLowerCase() : string;
}

function log(message) {
    if (debug)
        console.log(message);
}

function get_request(url, $http, $translate, $mdDialog, callback, errCallback = undefined) {
    $http.get(url, {
        headers: {'Authorization': getAuthentication()}
    })
        .then(function (response) {
            if (response.data.status === true) {
                callback(response.data);
            } else {
                var unknownError = $mdDialog.alert()
                    .title($translate.instant('error_occurred'))
                    .textContent(response.data.cause)
                    .ok($translate.instant('ok'));
                $mdDialog.show(unknownError);
            }
        }, function errorCallback(response) {
            if (errCallback !== undefined)
                errCallback(response);
            var unknownError = $mdDialog.alert()
                .title($translate.instant('error_occurred'))
                .textContent(response.data.cause)
                .ok($translate.instant('ok'));
            $mdDialog.show(unknownError);
        });
}

function ProgressDialogController($scope, title, desc) {
    $scope.title = title;
    $scope.msg = desc;
}

function progressDialog($mdDialog, title, message, locked = false) {
    return $mdDialog.show({
        controller: ProgressDialogController,
        locals: {
            'title': title,
            'desc': message
        },
        templateUrl: 'progress_dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: !locked,
    });

}

// Angular deprecated the lowercase function as of v1.6.7. TextAngular hasn't
// updated to reflect this
angular.lowercase = lowercase;

angular.module('EdisonWeb', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute', 'pascalprecht.translate'])
    .config(function ($mdThemingProvider, $routeProvider, $locationProvider, $provide, $translateProvider, $mdIconProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $mdIconProvider.fontSet('md', 'material-icons');


        $translateProvider.translations('fi',fi_lang);

        $translateProvider.translations('en',en_lang);

        $translateProvider.preferredLanguage(getData(dataEntries.language) || 'fi');

        $mdThemingProvider.definePalette('edisonDefault', {
            '50': 'e9e9e9',
            '100': 'e9e9e9',
            '200': 'e9e9e9',
            '300': 'e9e9e9',
            '400': 'e9e9e9',
            '500': '00ACC1',
            '600': '00ACC1',
            '700': '00ACC1',
            '800': '00ACC1',
            '900': '00ACC1',
            'A100': '00ACC1',
            'A200': '00ACC1',
            'A400': '00ACC1',
            'A700': '00ACC1',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.definePalette('edisonAccent', {
            '50': 'e9e9e9',
            '100': 'e9e9e9',
            '200': 'e9e9e9',
            '300': 'e9e9e9',
            '400': 'e9e9e9',
            '500': '89C607',
            '600': '89C607',
            '700': '89C607',
            '800': '89C607',
            '900': '89C607',
            'A100': '89C607',
            'A200': '89C607',
            'A400': '89C607',
            'A700': '89C607',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': undefined,
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.definePalette('edisonLoginTheme', {
            //00ACC1
            '50': '067bc1',
            '100': '067bc1',
            '200': '067bc1',
            '300': '067bc1',
            '400': '067bc1',
            '500': '067bc1',
            '600': '067bc1',
            '700': '067bc1',
            '800': '067bc1',
            '900': '067bc1',
            'A100': '067bc1',
            'A200': '067bc1',
            'A400': '067bc1',
            'A700': '067bc1',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': undefined,
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.definePalette('edisonLoginProgressbarTheme', {
            //00ACC1
            '50': '003e4c',
            '100': '003e4c',
            '200': '003e4c',
            '300': '003e4c',
            '400': '003e4c',
            '500': '067bc1',
            '600': '067bc1',
            '700': '067bc1',
            '800': '067bc1',
            '900': '067bc1',
            'A100': '067bc1',
            'A200': '067bc1',
            'A400': '067bc1',
            'A700': '067bc1',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': undefined,
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });

        $mdThemingProvider.alwaysWatchTheme(true);
        $mdThemingProvider.theme('progress').primaryPalette('edisonAccent').accentPalette('edisonAccent');
        $mdThemingProvider.theme('default').primaryPalette('edisonDefault').accentPalette('edisonAccent');
        $mdThemingProvider.theme('login').primaryPalette('edisonLoginTheme').dark();
        $mdThemingProvider.theme('login_progress').primaryPalette('edisonLoginProgressbarTheme').dark();
        $mdThemingProvider.alwaysWatchTheme(true);
        $provide.value('$mdThemingProvider', $mdThemingProvider);
        $routeProvider
            .when("/", {
                templateUrl: baseURL + "templates/main.html",
                "controller": "main"
            })
            .when("/login", {
                templateUrl: baseURL + "templates/login.html",
                controller: "login"
            })

            .when("/home", {
                templateUrl: baseURL + "templates/client.html",
                controller: "client"
            });
    })
    .controller('WebCtl', function($scope, $mdDialog, $mdSidenav) {

    }).controller('login',  function ($scope, $mdThemingProvider, $mdDialog, $http, $location, $translate) {
    $mdThemingProvider.setDefaultTheme('login');
    checkSession($location, false);
    $scope.baseURL = baseURL;
    function validateSession(session) {
        $mdDialog.show({
            controller: SessionCheckController,
            locals: {
                'session': session,
                'callback': function (csrf) {
                    log(csrf);
                    saveData(dataEntries.authentication, JSON.stringify(generateAuthenticationJSON(session, csrf['csrf'], csrf['id'])));
                    saveData(dataEntries.loggedin, true);
                    checkSession($location, false);
                }
            },
            templateUrl: baseURL + 'templates/session_validate.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
        });
    }
    var options = [
        {icon: 'smartphone', src: '', title: 'login_phone', onclick: function () {
                if (!debug) {
                    $mdDialog.show($mdDialog.alert()
                        .title($translate.instant("not_implemented_yet"))
                        .textContent($translate.instant("not_implemented_yet_msg"))
                        .ok($translate.instant("ok")));
                } else {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: baseURL + 'templates/edison_login.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                    }).then(function (answer) {

                    });
                }
            }},
        {icon: 'vpn_key', src: '', title: 'login_session', onclick: function () {
                var confirm = $mdDialog.prompt()
                    .title($translate.instant('login_session'))
                    .textContent($translate.instant('login_session_msg'))
                    .placeholder('appsid')
                    .ariaLabel('appsid')
                    .required(true)
                    .ok($translate.instant('continue'))
                    .cancel($translate.instant('cancel'));

                $mdDialog.show(confirm).then(function(result) {
                    validateSession(result);
                }, undefined);
            }}
    ];
    $scope.options = [].concat(options);

    function DialogController($scope, $mdDialog) {

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {

        };
    }

    function SessionCheckController($scope, $http, $mdDialog, $translate, session, callback) {

        checkSession();
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        function checkSession() {
            $http.post("/api/v1/session/csrf_token/", {
                "session": session
            })
                .then(function (response) {
                    if (response.data.status === true) {
                        $mdDialog.cancel();
                        callback(response.data);
                    } else {
                        var unknownError = $mdDialog.alert()
                            .title($translate.instant('error_occurred'))
                            .textContent(response.data.cause)
                            .ok($translate.instant('ok'));
                        $mdDialog.show(unknownError);
                    }
                    }, function errorCallback(response) {
                if (response.status === 401) {
                    var error = $mdDialog.alert()
                        .title($translate.instant('wrong_session'))
                        .textContent($translate.instant('wrong_session_msg'))
                        .ok($translate.instant('ok'));
                    $mdDialog.show(error);
                } else {
                    var unknownError = $mdDialog.alert()
                        .title($translate.instant('error_occurred'))
                        .textContent(response.data.cause)
                        .ok($translate.instant('ok'));
                    $mdDialog.show(unknownError);
                }
            });
        }
    }


}).controller('main',  function ($scope, $mdThemingProvider, $http, $location) {
    $mdThemingProvider.setDefaultTheme('default');
    checkSession($location, false);

}).controller('client',  function ($scope, $mdThemingProvider, $http, $location, $mdDialog, $translate) {
    $mdThemingProvider.setDefaultTheme('default');
    $scope.cardsLoaded = false;
    $scope.offlineMode = false;
    var cardMap = new Map();
    $scope.getCard = function (cardId) {
        return cardMap.get(cardId)
    };
    $scope.getThumbnail = function (cardId) {
        var card = cardMap.get(cardId);
        if (card.thumbnail === undefined)
            return "https://app.edison.fi/static/dreamcards/img/bookmark.png";
        else
            return "https://app.edison.fi" + card.thumbnail;
    };
    $scope.openAbout = function () {
        $mdDialog.show({
            templateUrl: baseURL + 'templates/edison_about.html',
            controller: function ($scope) {
                $scope.version = version;
                $scope.year = serverYear;
                $scope.baseURL = baseURL;
                $scope.window = window;
            },
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
    $scope.edisonColorToCode = edisonColorToCode;
    $scope.logout = function () {
        clearAuthentication();
        checkSession($location, false);
    };
    checkSession($location, false);
    var offlineData = getOfflineData();
    $scope.pages = [];
    $scope.cards = [];
    offlineData.then(function (item) {
        if (item != null) {
            log(item.data);
            var data = item.data;
            $scope.pages = data.pages;
            $scope.cards = data.cards;
            $scope.cardsLoaded = true;
            $scope.offlineMode = true;
            cardMap.clear();
            data.cards.forEach(function (card) {
                cardMap.set(card.id, card);
            });
        }
    });

    $scope.openCard = function (card) {
        log(card);
        card = $scope.getCard(card);
        var cardURL = card.url;
        if (cardURL.includes("/sso/wilma/login")) {
            cardURL = edisonURL + cardURL;
            progressDialog($mdDialog, $translate.instant('logging_wilma'), $translate.instant('please_wait'), true);
            get_request("/api/v1/desktop/wilma?sso_url=" + cardURL, $http, $translate, $mdDialog, function (response) {
                $mdDialog.hide();
                window.open(response['sso'], "_blank");
            }, function (response) {
                $mdDialog.hide();
            });
        } else
            window.open(cardURL, "_blank");
    };

    get_request("/api/v1/desktop", $http, $translate, $mdDialog, function (response) {
        $scope.pages = response.pages;
        $scope.cards = response.cards;
        cardMap.clear();
        response.cards.forEach(function (card) {
            cardMap.set(card.id, card);
        });
        $scope.cardsLoaded = true;
        $scope.offlineMode = false;
        saveOfflineData(response);
    });
});