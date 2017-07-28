/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, flickrService, $location, widgetService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId']
        model.pageId = $routeParams['pageId']
        model.widgetId = $routeParams['widgetId']
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    model.widget.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
                    widgetService
                        .updateWidget(model.widget, model.widgetId)
                        .then(function (response) {
                            $location.url('/profile/website/'+model.websiteId+'/page/'+model.pageId+"/widget/"+model.widgetId);

                        })
                });
        }

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });


        }
    }
})();