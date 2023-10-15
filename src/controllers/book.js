import * as services from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";
import { bookID,title, price, available, category_code, image, bookIDs, filename } from "../helpers/joi_schema";
import joi from 'joi'
const cloudinary = require('cloudinary').v2;

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
        const fileData = req.file
        const {error} = joi.object({ title, price, available, category_code, image }).validate({...req.body, image: fileData?.path})
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }
        const response = await services.createNewBook(req.body, fileData)
        return res.status(200).json(response)

    }catch (error){
        return internalServerError(res)
    }
}

//UPDATE
export const updateBook= async (req, res) =>{
    try{      
        const fileData = req.file
        const {error} = joi.object({ bookID }).validate( { bookID: req.body.bookID} )
        if (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }
        const response = await services.updateBook(req.body, fileData)
        return res.status(200).json(response)

    }catch (error){
        return internalServerError(res)
    }
}

//DELETE
export const deleteBook= async (req, res) =>{
    try{      
        const {error} = joi.object({ bookIDs, filename }).validate( req.query )
        if (error) {          
            return badRequest(error.details[0].message, res)
        }
        const response = await services.deleteBook(req.query.bookIDs, req.query.filename)
        return res.status(200).json(response)

    }catch (error){
        return internalServerError(res)
    }
}