"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trash = exports.Update = exports.Get_one = exports.Get = exports.Create = void 0;
const category_model_1 = require("../models/category.model");
const custom_error_util_1 = require("../utils/custom_error.util");
const category_validation_1 = require("../validations/category.validation");
const Create = async (req, res) => {
    try {
        (0, custom_error_util_1.CustomError)(category_validation_1.validateCategoryInput, req.body, res);
        const Exists = await category_model_1.Category.findOne({ category_name: req.body.category_name });
        if (Exists) {
            res.status(400).json("Category already Exists");
            return;
        }
        req.body.createdBy = req.user.userId;
        const category = new category_model_1.Category(req.body);
        const newcategory = await category.save();
        res.status(201).json({ message: "admin added  successfully", newcategory });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
exports.Create = Create;
const Get = async (req, res) => {
    try {
        const { page = 1, limit = 10, sendId } = req.query;
        const categories = await category_model_1.Category.find({ deletedAt: null }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await category_model_1.Category.countDocuments();
        res.status(201).json({
            categories, page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
        return;
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
exports.Get = Get;
const Get_one = async (req, res) => {
    try {
        const { id } = req.query;
        const Category_obj = await category_model_1.Category.findById(id);
        res.status(201).json(Category_obj);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
exports.Get_one = Get_one;
const Update = async (req, res) => {
    try {
        let updates = await category_model_1.Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false });
        res.status(200).json(updates._id);
        return;
    }
    catch (error) {
        res.status(400).json(error);
        return;
    }
};
exports.Update = Update;
const Trash = async (req, res) => {
    try {
        let deleted = await category_model_1.Category.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false });
        res.status(200).json(`${deleted.category_name} deleted successfully`);
        return;
    }
    catch (error) {
        res.status(404).json(error);
        return;
        throw new Error("deletion Failed ");
    }
};
exports.Trash = Trash;
