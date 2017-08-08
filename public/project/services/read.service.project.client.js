/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('readService', readService);

    function readService($http) {

        var api = {
            getQuestions: getQuestions
        };

        return api;

        function getQuestions() {
            var url = '/api/project/question';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
           }
})();
