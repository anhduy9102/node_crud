import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";
import { title, price, available, category_code, image } from "../helpers/joi_schema";
import joi from 'joi'

export const getBooks= async (req, res) =>{
    try{      
        const response = await services.getBooks(req.query)
        return res.status(200).json(response)

    }catch (error){
        return internalServerError(res)
    }
}

//CREATE
export const createNewBook= async (req, res) =>{
    try{      
        const {error} = joi.object({ title, price, available, category_code, image }).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const response = await services.createNewBook(req.body)
        return res.status(200).json(response)

    }catch (error){
        return internalServerError(res)
    }
}