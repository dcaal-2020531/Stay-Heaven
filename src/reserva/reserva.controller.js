import Reserva from './reserva.model.js'
import Habitacion from '../habitacion/habitacion.model.js'

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    try {
        const { 
            habitacionId, 
            usuarioId, 
            fromDate, 
            toDate, 
            serviciosAdicionales, 
            precioTotal 
        } = req.body

        // Verificar que la habitación esté disponible en las fechas
        const habitacion = await Habitacion.findById(habitacionId)
        if (!habitacion || !habitacion.status) {
            return res.status(404).json(
                { message: 'Habitación no disponible o inactiva' }
            )
        }

        const hayConflicto = habitacion.availability.some(
            rango => {
                return (
                    new Date(fromDate) < new Date(rango.to) &&
                    new Date(toDate) > new Date(rango.from)
                )
            }  
        )

        if (hayConflicto) {
            return res.status(400).json(
                { message: 'La habitación no está disponible en esas fechas' }
            )
        }

        // Crear la reserva
        const nuevaReserva = new Reserva({
            habitacion: habitacionId,
            usuario: usuarioId,
            hotel: habitacion.hotel,
            fromDate,
            toDate,
            serviciosAdicionales,
            precioTotal
        })

        await nuevaReserva.save()

        // Agregar la reserva al array de disponibilidad de la habitación
        habitacion.availability.push({ from: fromDate, to: toDate })
        await habitacion.save()
        
        return res.status(201).json(
            { 
                message: 'Reserva realizada con éxito', 
                reserva: nuevaReserva 
            }
        )

    } catch (error) {
        return res.status(500).json(
            { message: 'Error al crear reserva', error }
        )
    }
}

// Obtener todas las reservas (por hotel o usuario)
export const obtenerReservas = async (req, res) => {
    try {
        const { hotelId, usuarioId } = req.query

        const query = {}
        if (hotelId) query.hotel = hotelId
        if (usuarioId) query.usuario = usuarioId

        const reservas = await Reserva.find(query).populate('habitacion usuario hotel')

        res.json(reservas)

    } catch (error) {
        return res.status(500).json(
            { message: 'Error al obtener reservas', error }
        )
    }
}

// Obtener una reserva por su ID
export const obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('habitacion usuario hotel')

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' })
        }

        res.json(reserva)

    } catch (error) {
        return res.status(500).json(
            { message: 'Error al obtener reserva', error }
        )
    }
}

// Cancelar una reserva
export const cancelarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' })
        }

        // Cambiar estado a cancelada
        reserva.estado = 'cancelada'
        await reserva.save()

        res.json({ message: 'Reserva cancelada', reserva })

    } catch (error) {
        return res.status(500).json(
            { message: 'Error al cancelar reserva', error }
        )
    }
}