import { Router } from 'express'
import {
    createAdminHotel,
    getAllAdminsHotel,
    getAdminHotelById,
    updateAdminHotel,
    deleteAdminHotel
} from './adminHotel.controller.js'

const api = Router();

// Crear admin hotel
api.post(
    '/', 
    createAdminHotel
)

// Obtener todos los admins hotel
api.get(
    '/', 
    getAllAdminsHotel
)

// Obtener un admin hotel por ID
api.get(
    '/:id', 
    getAdminHotelById
)

// Actualizar admin hotel
api.put(
    '/update/:id', 
    updateAdminHotel
)

// Eliminar admin hotel (actualizar status: true/false)
api.put(
    '/status/:id', 
    deleteAdminHotel
)

export default api