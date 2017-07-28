/**
 * Created by sushantmimani on 6/20/17.
 */

(function () {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/profile/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
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
