var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../../models/website/website.model.server')


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidgetForPage = addWidgetForPage;
pageModel.deleteWidget = deleteWidget;
pageModel.getAllWidgetsForPage = getAllWidgetsForPage;
pageModel.reorderWidget = reorderWidget;

module.exports = pageModel;

function reorderWidget(pageId, widgetList) {
    return pageModel
        .update({_id: pageId}, {$set: {widgets:widgetList}})
}

function getAllWidgetsForPage(pageId) {
    return pageModel
        .find({_id:pageId}, {widgets:1, _id:0})
}

function deleteWidget(widgetId, pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}
function addWidgetForPage(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId)
           return page.save();
        });
}

function deletePage(pageId, websiteId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(pageId, websiteId);
        });
}

function createPage(websiteId, page) {
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPageForWebsite(websiteId, page._id)
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}


function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}


function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}
