"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomError = (validator, body, res) => {
    const { errors, isValid } = validator(body);
    if (!isValid) {
        const firstError = Object.values(errors)[0];
        res.status(400).json(firstError);
        return false; // <== Tell controller to stop
    }
    return true;
};
exports.CustomError = CustomError;
