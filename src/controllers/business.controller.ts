
import { Request, Response } from "express";

import { CustomError } from "../utils/custom_error.util";
import { Business } from "../models/business.model";
import { validateBusinessInput } from "../validations/business.validations";



export const Create = async (req: Request | any, res: Response) => {
    try {

        CustomError(validateBusinessInput, req.body, res)
        const Exists: any = await Business.findOne({ Business_name: req.body.business_name });
        if (Exists) {
            res.status(400).json("Business already Exists")
            return
        }
        req.body.createdBy = req.user.userId
        const newbusiness: any = new Business(req.body);
        const newBusiness = await newbusiness.save();
        res.status(201).json({ message: "admin added  successfully", newBusiness });
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
        const businessess: any = await Business.find({ deletedAt: null, createdBy: req.user.userId }).populate('category').skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await Business.countDocuments();
        res.status(201).json(
            {
                businessess, page: parseInt(page),
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
        const Business_obj: any = await Business.findOne({_id: id, deletedAt: null }).populate('category')
        res.status(201).json(Business_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};
export const Update = async (req: Request | any, res: Response | any) => {
    try {
        const Exists: any = await Business.findOne({
            Business_name: req.body.business_name,
            _id: { $ne: req.params.id } // exclude the current business
        });

        if (Exists) {
            res.status(400).json("Business name already taken");
            return;
        }



        let updates: any = await Business.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, useFindAndModify: false }
        );

        res.status(200).json(updates._id);
        return

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        return
    }
};
export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await Business.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.Business_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};

