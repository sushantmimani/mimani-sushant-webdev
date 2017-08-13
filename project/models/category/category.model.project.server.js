/**
 * Created by sushantmimani on 8/7/17.
 */

var mongoose = require('mongoose');
var categorySchema_project = require('./category.schema.project.server');
var categoryModel_project = mongoose.model('CategoryModel_project', categorySchema_project);

categoryModel_project.createCategory = createCategory;
categoryModel_project.getAllCategories = getAllCategories;
categoryModel_project.updateCategory = updateCategory;
categoryModel_project.deleteCategory = deleteCategory;

module.exports = categoryModel_project;


function createCategory (category) {
    return categoryModel_project.create(category);

}

function getAllCategories() {
    return categoryModel_project.find()
    }

function updateCategory(category) {
    return categoryModel_project.update({_id:category._id}, {$set:category});
}

function deleteCategory(categoryId) {
    return categoryModel_project.remove({_id:categoryId});
}

