import { Schema, model } from 'mongoose'

const employeeSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    role: {
      type: String,
      default: 'EMPLOYEE'
    },
    status: {
      type: Boolean,
      default: true
    }
  }
)

export default model('Employee', employeeSchema)