import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const accountSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    role:{
        type: String
    },
    address:{
        type: String
    },
    password:{
        type: String
    },
    Phone:{
        type: String
    }
    
})

export const Account = model("Account",accountSchema)
export type AccountModel = typeof Account;