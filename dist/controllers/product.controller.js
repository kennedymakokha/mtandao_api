"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trash = exports.Update = exports.Get_products_per_business = exports.Get_one = exports.Get = exports.Create = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const product_model_1 = require("../models/product.model");
// Create upload directory if it doesn't exist
const uploadDir = path_1.default.join(__dirname, "../../public/uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${(0, uuid_1.v4)()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
const Create = async (req, res) => {
    try {
        // await CustomError(validateProductInput, req.body, res)
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).json({ message: "No files uploaded." });
            return;
        }
        const imageUrls = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        console.log("res", req.body);
        const Exists = await product_model_1.ProductModel.findOne({ business: req.body.business, product_name: req.body.product_name });
        if (Exists) {
            res.status(400).json("product exists already Exists");
            return;
        }
        req.body.images = imageUrls;
        req.body.createdBy = req.user.userId;
        const newproduct = new product_model_1.ProductModel(req.body);
        await newproduct.save();
        res.status(201).json({ message: "admin added  successfully", newproduct });
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
        const products = await product_model_1.ProductModel.find({ deletedAt: null, createdBy: req.user.userId }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await product_model_1.ProductModel.countDocuments();
        res.status(201).json({
            products, page: parseInt(page),
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
        const product_obj = await product_model_1.ProductModel.findById(id);
        res.status(201).json(product_obj);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
exports.Get_one = Get_one;
const Get_products_per_business = async (req, res) => {
    try {
        const { page = 1, limit = 10, id } = req.query;
        const products = await product_model_1.ProductModel.find({ business: req.params.id }).sort({ createdAt: -1 }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await product_model_1.ProductModel.countDocuments();
        res.status(201).json({
            products, page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
        return;
    }
};
exports.Get_products_per_business = Get_products_per_business;
const Update = async (req, res) => {
    try {
        let updates = await product_model_1.ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false });
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
        let deleted = await product_model_1.ProductModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false });
        res.status(200).json(`${deleted.product_name} deleted successfully`);
        return;
    }
    catch (error) {
        res.status(404).json(error);
        return;
        throw new Error("deletion Failed ");
    }
};
exports.Trash = Trash;
