import { Router } from 'express'
import {
    createHabitacion,
    getAllHabitaciones,
    getHabitacionById,
    updateHabitacion,
    deleteHabitacion,
    updateDisponibilidadHabitacion
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
    '/update/:id', 
    updateHabitacion
)

// Eliminar habitación (actualizar status: true/false)
api.put(
    '/delete/:id', 
    deleteHabitacion
)

// Actualizar disponibilidad de una habitación (solo admin hotel autorizado)
api.put(
    '/disponibilidad/:id', 
    updateDisponibilidadHabitacion
)

export default api