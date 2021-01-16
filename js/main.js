/*
 * Copyright (c) 2021 EdisonWeb.
 * @author Developer From Jokela
 */

var version = "1.0.6-alpha";
var rpcURl = "wss://developerfromjokela.com/edisonrpc/";
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

function post_request(url, data, $http, $translate, $mdDialog, callback, errCallback = undefined) {
    $http.post(url, data, {
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

function PageActionsController($scope, $mdDialog, $translate, $http, page, refreshDesktop) {
    $scope.delete = function () {
        $mdDialog.show(
            $mdDialog.confirm().title($translate.instant('delete')).textContent($translate.instant('delete_page_warning')).ok($translate.instant('delete')).cancel($translate.instant('cancel'))
        ).then(function (result) {
            progressDialog($mdDialog, $translate.instant('deleting_page'), $translate.instant('please_wait'), true);
            post_request(baseURL + "api/v1/desktop/pages/delete/", page, $http, $translate, $mdDialog, function () {
                $mdDialog.hide();
                refreshDesktop(false);
            });
        });
    };
}


// Angular deprecated the lowercase function as of v1.6.7. TextAngular hasn't
// updated to reflect this
angular.lowercase = lowercase;

var app = angular.module('EdisonWeb', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute', 'pascalprecht.translate'])
    .config(function ($mdThemingProvider, $routeProvider, $locationProvider, $provide, $translateProvider, $mdIconProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
        $mdIconProvider.fontSet('md', 'material-icons');


        $translateProvider.translations('fi', fi_lang);

        $translateProvider.translations('en', en_lang);

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

    function validateSession(session, mobile = false) {
        $mdDialog.show({
            controller: SessionCheckController,
            locals: {
                'mobile': mobile,
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
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: baseURL + 'templates/edison_login.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                });
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


    function DialogController($scope, $mdDialog, $http) {

        $scope.rpcInit = false;
        $scope.rpcConnect = false;
        $scope.error = null;


        var edisonRpc = new WebSocket(rpcURl);
        var qrcode;
        var keys;

        edisonRpc.onerror = function () {
            log("ERROR!");
            $scope.error = {
                detail: $translate.instant('rpc_error'),
                callback: function () {
                    edisonRpc.close();
                    $mdDialog.hide();
                }
            };
        }
        edisonRpc.onopen = function () {
            $scope.rpcConnect = true;
            log("opened!");
            qrcode = new QRCode(document.getElementById("qrcode_container"), {
                text: "",
                height: 1024,
                width: 1024,
                colorDark: "#ffffff",
                colorLight: "#00000000",
                correctLevel: QRCode.CorrectLevel.H
            });
        }

        function generateQRCode(content) {
            qrcode.clear();
            qrcode.makeCode(content);
        }

        function login(data, callback) {
            $http.post(baseURL + "api/v1/session/csrf_token/", {
                "session": data
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
                    if (response.status === 401) {
                        var error = $mdDialog.alert()
                            .title($translate.instant((!$scope.mobile) ? 'wrong_session' : 'login_failed_mobile'))
                            .textContent($translate.instant((!$scope.mobile) ? 'wrong_session_msg' : 'login_failed_mobile_msg'))
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

        var data;

        edisonRpc.onmessage = function (event) {
            var content = event.data;
            try {
                var contentJSON = JSON.parse(content);
                log(contentJSON);
                if (contentJSON.type === "action") {
                    if (contentJSON.action === "authentication") {
                        log("initing");
                        edisonRpc.send(JSON.stringify({"action": "init", "type": "webclient"}));
                    } else if (contentJSON.action === "loginIdChange") {
                        log("changing loginID");
                        $scope.rpcInit = false;
                        $scope.$apply();
                        generateRSAKeys(function (e) {
                            log(e);
                            keys = e.keys;
                            var pubKey = e.public;
                            edisonRpc.send(JSON.stringify({'action': 'keylink', 'key': pubKey}))
                        });
                    } else if (contentJSON.action === "data_transfer") {
                        var trData = contentJSON.data;
                        var uuid = contentJSON.uuid;
                        data = trData;
                        edisonRpc.send(JSON.stringify({'action': 'data_transfer_complete', 'uuid': uuid}));
                    } else if (contentJSON.action === "data_transfer_complete") {
                        decryptRSAMessage(data, keys, function (session) {
                            log("DATA: ");
                            log(session);
                            validateSession(session);
                        });
                    } else if (contentJSON.action === "keyRegistered") {
                        var loginID = contentJSON.loginId;
                        generateQRCode(loginID);
                        $scope.rpcInit = true;
                        $scope.$apply()
                    }
                }

            } catch (e) {
                $scope.error = {
                    detail: e,
                    callback: function () {
                        $scope.error = null;
                        edisonRpc.close();
                        $mdDialog.hide();
                    }
                };
            }
        }


        $scope.hide = function () {
            $mdDialog.hide();
            edisonRpc.close();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
            edisonRpc.close();
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
            $http.post(baseURL + "api/v1/session/csrf_token/", {
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
                        .title($translate.instant((!$scope.mobile) ? 'wrong_session' : 'login_failed_mobile'))
                        .textContent($translate.instant((!$scope.mobile) ? 'wrong_session_msg' : 'login_failed_mobile_msg'))
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


}).controller('main', function ($scope, $mdThemingProvider, $http, $location) {
    $mdThemingProvider.setDefaultTheme('default');
    checkSession($location, false);

}).controller('client', function ($scope, $mdThemingProvider, $http, $location, $mdDialog, $mdBottomSheet, $translate) {
    $mdThemingProvider.setDefaultTheme('default');

    $scope.cardsLoaded = false;
    $scope.offlineMode = false;
    var cardMap = new Map();
    $scope.getCard = function (cardId) {
        return cardMap.get(cardId)
    };
    $scope.getThumbnail = function (cardId) {
        if (cardId === parseInt(cardId, 10))
            var card = cardMap.get(cardId);
        else
            card = cardId;
        if (card.thumbnail === undefined || card.thumbnail === null)
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
        var logoutConfirm = $mdDialog.confirm()
            .title($translate.instant('logout_title'))
            .textContent($translate.instant('logout_msg'))
            .ariaLabel('logout')
            .ok($translate.instant('logout'))
            .cancel($translate.instant('cancel'));

        $mdDialog.show(logoutConfirm).then(function () {
            clearAuthentication();
            checkSession($location, false);
        }, function () {
        });

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
            if (data.categories !== undefined)
                $scope.categories = data.categories;
            $scope.cardsLoaded = true;
            $scope.offlineMode = true;
            cardMap.clear();
            data.cards.forEach(function (card) {
                cardMap.set(card.id, card);
            });
        }
    });
    $scope.openPageAdd = function () {
        var confirm = $mdDialog.prompt()
            .title($translate.instant('add_page'))
            .textContent($translate.instant('add_page_msg'))
            .placeholder($translate.instant('page_placeholder'))
            .ariaLabel('add_page')
            .required(true)
            .ok($translate.instant('continue'))
            .cancel($translate.instant('cancel'));

        $mdDialog.show(confirm).then(function (result) {
            progressDialog($mdDialog, $translate.instant('adding_page'), $translate.instant('please_wait'), true);
            post_request(baseURL + "api/v1/desktop/pages/add/", {
                "title": result
            }, $http, $translate, $mdDialog, function (response) {
                $mdDialog.hide();
                refreshDesktop(false);
            })
        }, undefined);
    };

    $scope.openCard = function (card) {
        log(card);
        if (card === parseInt(card, 10))
            card = cardMap.get(card);
        var cardURL = card.url;
        if (cardURL.includes("/sso/wilma/login")) {
            cardURL = edisonURL + cardURL;

            function signInToWilma() {
                progressDialog($mdDialog, $translate.instant('logging_wilma'), $translate.instant('please_wait'), true);
                get_request(baseURL + "api/v1/desktop/wilma?sso_url=" + cardURL, $http, $translate, $mdDialog, function (response) {
                    $mdDialog.hide();
                    window.open(response['sso'], "_blank");
                }, function (response) {
                    $mdDialog.hide();
                });
            }

            if (debug) {
                var wilmaClientConfirm = $mdDialog.confirm()
                    .title($translate.instant('wilmaclient_title'))
                    .textContent($translate.instant('wilmaclient_msg'))
                    .ok($translate.instant('open_wilma'))
                    .cancel($translate.instant('no_thanks'));

                $mdDialog.show(wilmaClientConfirm).then(function () {
                    $location.path('wilmaclient')
                }, function () {
                    signInToWilma();
                });
            } else {
                signInToWilma();
            }

        } else
            window.open(cardURL, "_blank");
    };

    $scope.handleClick = function (event) {
        switch (event.which) {
            case 3:
                $mdMenu.open(event);
                break;
            default:
                break;
        }
    };

    $scope.openPageActions = function (page) {
        $mdDialog.show({
            controller: PageActionsController,
            locals: {
                'page': page,
                'refreshDesktop': refreshDesktop
            },
            templateUrl: baseURL + 'templates/page_actions.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.getCategoryCards = function (category) {
        var cards = [];
        $scope.cards.forEach(function (card) {
            if (card.category !== null && category != null) {
                if (card.category.id === category.id) {
                    cards.push(card);
                }
            } else if (category === null && card.category === null)
                cards.push(card);

        });
        return cards;
    };

    $scope.openCardSelector = function (page) {
        $scope.currentTab = $scope.pages.length
    };


    function refreshDesktop(first = true) {
        if (!first)
            $scope.offlineMode = true;
        get_request(baseURL + "api/v1/desktop", $http, $translate, $mdDialog, function (response) {
            $scope.pages = response.pages;
            $scope.cards = response.cards;
            $scope.categories = response.categories;
            log(response.categories);
            cardMap.clear();
            response.cards.forEach(function (card) {
                cardMap.set(card.id, card);
            });
            $scope.cardsLoaded = true;
            $scope.offlineMode = false;
            saveOfflineData(response);
        }, function (error) {
            $scope.cardsLoaded = true;
            $scope.offlineMode = false;
        });
    }


    refreshDesktop();
}).directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, {$event: event});
            });
        });
    };
});