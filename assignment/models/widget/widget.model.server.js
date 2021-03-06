var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function deleteWidget(widgetId, pageId) {
    return widgetModel
        .remove({_id:widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(widgetId, pageId);
        });
}


function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidgetForPage(pageId, widget._id)
        })
}


function reorderWidget(pageId, start, end) {
            return pageModel
                .getAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    var widgetList = widgets[0].widgets;
                    var widget = widgetList.splice(start, 1)[0];
                    widgetList.splice(end, 0, widget);
                    return pageModel
                        .update({_id:pageId},{$set: {widgets: widgetList}})
                })

}



function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}


function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec();
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}
