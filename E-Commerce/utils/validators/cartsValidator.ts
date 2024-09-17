import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

export const addProductToCartValidator: RequestHandler[] = [
    check('product')
    .notEmpty().withMessage('Product is required')
    .isMongoId().withMessage('invalid id'),
    validatorMiddleware
]

export const removeProductFromCartValidator: RequestHandler[] = [
    check('itemId').isMongoId().withMessage('invalid id'),
    validatorMiddleware
]

export const updateProductQuantityValidator: RequestHandler[] = [
    check('itemId').isMongoId().withMessage('invalid id'),
    check('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('quantity must be number').toInt()
    .custom((val: number) => {
    if (val <= 0) {
        throw new Error('invalid quantity')
    }
    return true;
    }),
    validatorMiddleware
]