import { Router } from 'express'
import {
    createHabitacion,
    getAllHabitaciones,
    getHabitacionById,
    updateHabitacion,
    deleteHabitacion
} from './habitacion.controller.js'

const api = Router();

// Crear habitación
api.post(
    '/', 
    createHabitacion
)

// Todas las habitaciones (Opcional filtrar por hotel)
api.get(
    '/', 
    getAllHabitaciones
)

// Obtener una habitación por su ID
api.get(
    '/:id', 
    getHabitacionById
)

// Actualizar habitación
api.put(
    '/:id', 
    updateHabitacion
)

// Soft delete
api.delete(
    '/:id', 
    deleteHabitacion
)

export default api
