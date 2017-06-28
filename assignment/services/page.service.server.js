/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');

app.post ('/api/website/:websiteId/page',createPage );
app.get ('/api/website/:websiteId/page',findAllPagesForWebsite);
app.get ('/api/page/:pageId', findPageById);
app.put  ('/api/page/:pageId', updatePage);
app.delete ('/api/page/:pageId', deletePage);



var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
]

function findAllPagesForWebsite(req, res) {

    var websiteId = req.params.websiteId;
    var pageList = [];
    for (var index in pages) {
        if (pages[index].websiteId === websiteId) {
            pageList.push(pages[index]);
        }
    }
    res.status(200).json(pageList);

}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var u in pages) {
        if(pageId === pages[u]._id) {
            pages[u] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(pages);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var u in pages) {
        if (pages[u]._id === pageId) {
            res.status(200).json(pages[u]);
            return;
        }
    }
    res.sendStatus(404);
}


