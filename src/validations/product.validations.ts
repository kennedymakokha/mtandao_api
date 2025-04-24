import Validator from 'validator';
import { isEmpty } from '../utils/isEmpty';
import { Business, Product } from '../types';


export const validateProductInput = (data: Product) => {
    let errors: Product | any = {};
    data.description = !isEmpty(data.description) && data.description !== undefined ? data.description : '';
    data.product_name = !isEmpty(data.product_name) && data.product_name !== undefined ? data.product_name : '';
    data.price = !isEmpty(data.price) && data.price !== undefined ? data.price : 0;
    data.business = !isEmpty(data.business) && data.business !== undefined ? data.business : '';
    if (Validator.isEmpty(data.product_name)) {
        errors.product_name = 'Name  field is required';
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = 'Name  field is required';
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = 'price  field is required';
    }
    if (Validator.isEmpty(data.business)) {
        errors.business = 'select a business  field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

