"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const sms_sender_util_1 = require("../utils/sms_sender.util");
const sendSms = async (req, res) => {
    const { message, phone, reciever, ref } = req.body;
    try {
        let response = await (0, sms_sender_util_1.sendTextMessage)(message, phone, reciever, ref);
        if (response.success) {
            res.status(200).json(response.data);
            return;
        }
        else {
            res.status(400).json(response.data);
            return;
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: error
        });
        return;
    }
};
exports.sendSms = sendSms;
