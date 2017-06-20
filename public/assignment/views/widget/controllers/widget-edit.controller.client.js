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
        console.log(model.websiteId)
        model.hasWebsite = false;

        function init() {

            model.widget = widgetService.findWidgetById(model.widgetId);
           console.log(model.widget);
        }

        init();

        model.deleteWidget = deleteWidget;
        model.updateWidget  = updateWidget;

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');

        }

        function updateWidget(widget) {
           widgetService.updateWidget(widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }


    }
})();