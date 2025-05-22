import { Router } from 'express'
import {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    confirmarReserva,
    cancelarReserva
} from './reserva.controller.js'

const api = Router()

// Crear una nueva reserva
api.post('/', crearReserva)

// Obtener todas las reservas (por hotel o usuario)
api.get('/', obtenerReservas)

// Obtener una reserva específica por su ID
api.get('/:id', obtenerReservaPorId)

// Confirmar una reserva (solo admin hotel autorizado)
api.put('/confirmar/:id', confirmarReserva)

// Cancelar una reserva
api.put('/cancelar/:id', cancelarReserva)

export default api