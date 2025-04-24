"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trash = exports.Update = exports.Get_one = exports.Get = exports.Create = void 0;
const custom_error_util_1 = require("../utils/custom_error.util");
const business_model_1 = require("../models/business.model");
const business_validations_1 = require("../validations/business.validations");
const Create = async (req, res) => {
    try {
        (0, custom_error_util_1.CustomError)(business_validations_1.validateBusinessInput, req.body, res);
        const Exists = await business_model_1.Business.findOne({ Business_name: req.body.business_name });
        if (Exists) {
            res.status(400).json("Business already Exists");
            return;
        }
        req.body.createdBy = req.user.userId;
        const newbusiness = new business_model_1.Business(req.body);
        const newBusiness = await newbusiness.save();
        res.status(201).json({ message: "admin added  successfully", newBusiness });
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
        const businessess = await business_model_1.Business.find({ deletedAt: null, createdBy: req.user.userId }).populate('category').skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await business_model_1.Business.countDocuments();
        res.status(201).json({
            businessess, page: parseInt(page),
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
        const Business_obj = await business_model_1.Business.findOne({ _id: id, deletedAt: null }).populate('category');
        res.status(201).json(Business_obj);
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
        const Exists = await business_model_1.Business.findOne({
            Business_name: req.body.business_name,
            _id: { $ne: req.params.id } // exclude the current business
        });
        if (Exists) {
            res.status(400).json("Business name already taken");
            return;
        }
        let updates = await business_model_1.Business.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false });
        res.status(200).json(updates._id);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};
exports.Update = Update;
const Trash = async (req, res) => {
    try {
        let deleted = await business_model_1.Business.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false });
        res.status(200).json(`${deleted.Business_name} deleted successfully`);
        return;
    }
    catch (error) {
        res.status(404).json(error);
        return;
        throw new Error("deletion Failed ");
    }
};
exports.Trash = Trash;
