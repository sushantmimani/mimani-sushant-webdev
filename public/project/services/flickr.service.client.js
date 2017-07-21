(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);
    
    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "0acc69b652da97990890fb7943daa663";
        var secret = "5118ada0fdeee914";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();