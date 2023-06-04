import mongoose, { Schema, model} from "mongoose";
import Joi from "joi";

const fishkaSchema = new Schema({
    front: {
        type: String, 
        required: [true, 'Set front of card'],
        unique: true,
    },
    back: {
        type: String, 
        required: [true, 'Set back of card'],
        unique: true,
    },
    tags: {
        type: String, 
    },
    author: {
        type: String, 
   }
})

export const fishkaJoiSchema = Joi.object({
    front: Joi.string().required(),
    back: Joi.string().required(),
    tags: Joi.string(),
    author: Joi.string()
})

export const Fishka = mongoose.model('Fishka', fishkaSchema )