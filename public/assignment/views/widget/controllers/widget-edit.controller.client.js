/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId']
        model.pageId = $routeParams['pageId']
        model.widgetId = $routeParams['widgetId']
        model.hasWebsite = false;

        function init() {

            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }

        init();

        model.deleteWidget = deleteWidget;
        model.updateWidget  = updateWidget;

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget')
                })

        }

        function updateWidget(widget) {
           widgetService
               .updateWidget(widget, model.widgetId)
               .then(function (response) {

                   $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');

               })
        }


    }
})();