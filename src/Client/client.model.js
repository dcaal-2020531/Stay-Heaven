import { Schema, model } from 'mongoose'

const clientSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            required: [true, 'Surname is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        phone: {
            type: String,
            required: [true, 'Phone is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        }
    }
)

export default model('Client', clientSchema)
