/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('categoryService', categoryService);

    function categoryService($http) {

        var api = {
            updateCategory: updateCategory,
            deleteCategory: deleteCategory,
            createCategory: createCategory
        };

        return api;


        function createCategory(category) {
            var url = '/api/project/category';
            return $http.post(url, category)
                .then(function (response) {
                    return response.data;
                })
        }
        function deleteCategory(category) {
            var url = '/api/project/category/'+category._id;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateCategory(category) {
            var url = '/api/project/category';
            return $http.put(url, category)
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
