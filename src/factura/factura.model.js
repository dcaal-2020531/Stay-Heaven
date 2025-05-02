import { Schema, model } from 'mongoose'

const invoiceSchema = Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User', // O 'Client' si ese es tu modelo de cliente
      required: [true, 'Se requiere cliente']
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Se requiere producto']
        },
        quantity: {
          type: Number,
          required: [true, 'Se requiere cantidad'],
          min: [1, 'La cantidad debe ser al menos 1']
        },
        price: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    total: {
      type: Number,
      //required: [true, 'Se requiere el total'],
      min: [0, 'El total debe ser un número positivo']
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['PAGADO', 'PENDIENTE', 'CANCELADO'],
      default: 'PENDIENTE'
    }
  },
  {
    timestamps: true
  }
)

export default model('Invoice', invoiceSchema)