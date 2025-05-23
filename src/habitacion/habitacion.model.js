import { Schema, model } from 'mongoose'

const habitacionSchema = Schema(
    {   
        hotel: {
            type: Schema.Types.ObjectId, 
            ref: 'Hotel',
            required: true
        },
        roomNumber: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['individual', 'doble', 'suite', 'familiar', 'lujo'],
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        pricePerNight: {
            type: Number,
            required: true,
            min: 0
        },
        amenities: {
            type: [String], // Ejemplo: ['WiFi', 'TV', 'Aire acondicionado']
            default: []
        },
        description: {
            type: String,
            default: ''
        },
        // SI o NO esta Disponible 
        availability: [
            {
                from: { type: Date, required: true },
                to: { type: Date, required: true }
            }
        ],
        images: {
            type: [String], // URLs o rutas a las imágenes
            default: []
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true // Añade createdAt y updatedAt automáticamente
    }
)

export default model('Habitacion', habitacionSchema)