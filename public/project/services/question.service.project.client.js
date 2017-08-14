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
            createQuestion: createQuestion,
            getQuestionById: getQuestionById,
            deleteQuestion:deleteQuestion,
            updateQuestion: updateQuestion,
            deleteQuestionforUser: deleteQuestionforUser

        };

        return api;

        function deleteQuestionforUser(userId) {

            var url = '/api/project/questionbyuser/'+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateQuestion(question) {
            var url = '/api/project/question';
            return $http.put(url,question)
                .then(function (response) {
                    return response.data;
                })
        }
        function deleteQuestion(qId) {
            var url = '/api/project/question/'+qId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
        function getQuestionById(qId) {
            var url = '/api/project/questionDetails/'+qId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

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
