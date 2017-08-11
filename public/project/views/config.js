/**
 * Created by sushantmimani on 6/20/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/user', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/read', {
                templateUrl: 'views/question/templates/question-list.view.client.html',
                controller: 'readController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/ask', {
                templateUrl: 'views/question/templates/question-new.view.client.html',
                controller: 'askController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/answer', {
                templateUrl: 'views/answer/templates/answer.view.client.html',
                controller: 'answerController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/question/:qId', {
                templateUrl: 'views/question/templates/question-details.view.client.html',
                controller: 'questionDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/content', {
                templateUrl: 'views/user/templates/user-content.view.client.html',
                controller: 'userContentController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
    }

    function checkLoggedIn ($q,userService, $location) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;

    }
})();
