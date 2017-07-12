var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../../models/website/website.model.server')


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

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
