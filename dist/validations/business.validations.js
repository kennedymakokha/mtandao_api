"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBusinessInput = void 0;
const validator_1 = __importDefault(require("validator"));
const isEmpty_1 = require("../utils/isEmpty");
const validateBusinessInput = (data) => {
    let errors = {};
    data.business_name = !(0, isEmpty_1.isEmpty)(data.business_name) && data.business_name !== undefined ? data.business_name : '';
    data.description = !(0, isEmpty_1.isEmpty)(data.description) && data.description !== undefined ? data.description : '';
    if (validator_1.default.isEmpty(data.business_name)) {
        errors.business_name = 'Name  field is required';
    }
    if (validator_1.default.isEmpty(data.description)) {
        errors.description = 'Name  field is required';
    }
    return {
        errors,
        isValid: (0, isEmpty_1.isEmpty)(errors)
    };
};
exports.validateBusinessInput = validateBusinessInput;
