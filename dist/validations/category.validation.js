"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategoryInput = void 0;
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = require("../utils/isEmpty");
const validateCategoryInput = (data) => {
    let errors = {};
    data.category_name = !(0, isEmpty_1.isEmpty)(data.category_name) && data.category_name !== undefined ? data.category_name : '';
    data.description = !(0, isEmpty_1.isEmpty)(data.description) && data.description !== undefined ? data.description : '';
    if (validator_1.default.isEmpty(data.category_name)) {
        errors.category_name = 'Name  field is required';
    }
    if (validator_1.default.isEmpty(data.description)) {
        errors.description = 'Name  field is required';
    }
    return {
        errors,
        isValid: (0, isEmpty_1.isEmpty)(errors)
    };
};
exports.validateCategoryInput = validateCategoryInput;
