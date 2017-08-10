/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('answerService', answerService);

    function answerService($http) {

        var api = {
            submitAnswer: submitAnswer,
            updateAnswer: updateAnswer
        };

        return api;

        function updateAnswer(answer) {
            var url = '/api/project/answer';
            return $http.put(url, answer)
                .then(function (response) {
                    return response.data;
                })
        }

        function submitAnswer (answer) {
            var url = '/api/project/answer';
            return $http.post(url, answer)
                .then(function (response) {
                    return response.data;
                })


        }
    }
})();
