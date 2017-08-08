/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('questionService', questionService);

    function questionService($http) {

        var api = {
            getQuestions: getQuestions,
            createQuestion: createQuestion
        };

        return api;

        function createQuestion(userId, question) {
            question.user = userId;
            var url = '/api/project/question';
            return $http.post(url, question)
                .then(function (response) {
                    return response.data;
                })
        }

        function getQuestions() {
            var url = '/api/project/question';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
           }
})();
