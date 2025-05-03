import { Schema, model } from 'mongoose'

const adminPlataformaSchema = Schema(
    { 
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't overcome 25 characters`],
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't overcome 25 characters`],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true, 
            maxLength: [20, `Can't overcome 20 characters`],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters']
        },
        role: { 
            type: String,
            enum: ['PLATFORM_ADMIN'], 
            default: 'PLATFORM_ADMIN' 
        },
        phone: {
            type: String,
            required: [true, 'Phone is required']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)


export default model('AdminPlataforma', adminPlataformaSchema)