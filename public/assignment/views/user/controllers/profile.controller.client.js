/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController ($routeParams, userService ) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

    }

})();