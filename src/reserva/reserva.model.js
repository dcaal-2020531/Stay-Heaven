import { Schema, model } from 'mongoose'

const reservaSchema = new Schema(
    {
        habitacion: { 
            type: Schema.Types.ObjectId, 
            ref: 'Habitacion', 
            required: true 
        },
        usuario: { 
            type: Schema.Types.ObjectId, 
            ref: 'Usuario', 
            required: true 
        },
        hotel: { 
            type: Schema.Types.ObjectId, 
            ref: 'Hotel', 
            required: true 
        },
        fromDate: { 
            type: Date, 
            required: true 
        },
        toDate: { 
            type: Date, 
            required: true 
        },
        estado: {
            type: String,
            enum: ['pendiente', 'confirmada', 'cancelada', 'finalizada'],
            default: 'pendiente'
        },
        serviciosAdicionales: { 
            type: [String], 
            default: [] 
        },
        precioTotal: { 
            type: Number, 
            required: true 
        }
    }, 
    {
    timestamps: true
    }
)

export default model('Reserva', reservaSchema)
