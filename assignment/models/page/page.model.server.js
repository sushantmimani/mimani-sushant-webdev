var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);



pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function deletePage(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function createPage(user) {
    return userModel.create(user);
}

function findPageById(pageId) {
    return pageModel.findById(userId);
}


function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}


function updatePage(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}
