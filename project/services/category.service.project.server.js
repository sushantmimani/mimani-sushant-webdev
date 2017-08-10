/**
 * Created by sushantmimani on 8/7/17.
 */

var app = require('../../express');
var categoryModel_project = require('../models/category/category.model.project.server');

app.get ('/api/project/category', getAllCategories);
app.post ('/api/project/category', createCategory);


function getAllCategories(req,res) {
        return categoryModel_project
            .getAllCategories()
            .then(function (categories) {
                res.send(categories)
            });
}

function createCategory(req, res) {
    var category = req.body;
    return categoryModel_project
        .createCategory(category)
        .then(function (category) {
            res.send(category);
        })
}