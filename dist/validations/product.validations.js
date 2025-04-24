"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductInput = void 0;
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = require("../utils/isEmpty");
const validateProductInput = (data) => {
    let errors = {};
    data.description = !(0, isEmpty_1.isEmpty)(data.description) && data.description !== undefined ? data.description : '';
    data.product_name = !(0, isEmpty_1.isEmpty)(data.product_name) && data.product_name !== undefined ? data.product_name : '';
    data.price = !(0, isEmpty_1.isEmpty)(data.price) && data.price !== undefined ? data.price : 0;
    data.business = !(0, isEmpty_1.isEmpty)(data.business) && data.business !== undefined ? data.business : '';
    if (validator_1.default.isEmpty(data.product_name)) {
        errors.product_name = 'Name  field is required';
    }
    if (validator_1.default.isEmpty(data.description)) {
        errors.description = 'Name  field is required';
    }
    if (validator_1.default.isEmpty(data.price)) {
        errors.price = 'price  field is required';
    }
    if (validator_1.default.isEmpty(data.business)) {
        errors.business = 'select a business  field is required';
    }
    return {
        errors,
        isValid: (0, isEmpty_1.isEmpty)(errors)
    };
};
exports.validateProductInput = validateProductInput;
