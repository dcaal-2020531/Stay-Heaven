import { Schema, model } from 'mongoose'

const hotelSchema = Schema(
    { 
        name:{
            type: String,
            required: [true, 'Name is required']
        },
        addres:{
            type: String,
            required: [true, 'Adress is required']
        },
        phone:{
            type: String,
            required: [true, 'Phone is required']
        },
        email:{
            type: String,
            required:[true, 'Email is required'],
            unique: true
        },
        country:{
            type:String,
            required:[true,'Country is required']
        },
        city:{
            type:String,
            required:[true,'City is required']
        },
        schedule:{
            type:String,
            required:[true,'Schedule is required']
        }
    }
)


export default model('Hotel', hotelSchema)