/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.post ('/api/website/:websiteId/page',createPage );
app.get ('/api/website/:websiteId/page',findAllPagesForWebsite);
app.get ('/api/page/:pageId', findPageById);
app.put  ('/api/page/:pageId', updatePage);
app.delete ('/api/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res) {

    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pageList) {
            res.status(200).json(pageList);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            return pageModel
                .deletePage(pageId, websiteId)
                .then(function (status) {
                    res.status(200).json(status);
                });
        });
};

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200).json(status);
        })
}

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page._website = websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })
}


