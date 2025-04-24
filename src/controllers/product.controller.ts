
import { Request, Response } from "express";
import fs from "fs";
import { CustomError } from "../utils/custom_error.util";
import { v4 as uuidv4 } from "uuid";
import multer from "multer"
import path from "path"
import { validateProductInput } from "../validations/product.validations";
import { ProductModel } from "../models/product.model";
// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {

        // await CustomError(validateProductInput, req.body, res)

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ message: "No files uploaded." });
            return
        }
        const imageUrls = files.map(
            (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`

        );
        console.log("res", req.body)
        const Exists: any = await ProductModel.findOne({ business: req.body.business, product_name: req.body.product_name });
        if (Exists) {
            res.status(400).json("product exists already Exists")
            return
        }
        req.body.images = imageUrls;
        req.body.createdBy = req.user.userId

        const newproduct: any = new ProductModel(req.body);
        await newproduct.save();
        res.status(201).json({ message: "admin added  successfully", newproduct });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get = async (req: Request | any, res: Response | any) => {
    try {
        const { page = 1, limit = 10, sendId } = req.query;
        const products: any = await ProductModel.find({ deletedAt: null, createdBy: req.user.userId }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await ProductModel.countDocuments();
        res.status(201).json(
            {
                products, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        );
        return; return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get_one = async (req: Request | any, res: Response | any) => {
    try {
        const { id } = req.query;

        const product_obj: any = await ProductModel.findById(id)
        res.status(201).json(product_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Get_products_per_business = async (req: Request | any, res: Response | any) => {
    try {

        const { page = 1, limit = 10, id } = req.query;

        const products: any = await ProductModel.find({ business: req.params.id }).sort({ createdAt: -1 }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await ProductModel.countDocuments();

        res.status(201).json(
            {
                products, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        );

        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Update = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json(updates._id)
        return
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        return
    }
};
export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.product_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};

