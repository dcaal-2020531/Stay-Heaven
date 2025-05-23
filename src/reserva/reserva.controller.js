import Reserva from './reserva.model.js'
import Habitacion from '../habitacion/habitacion.model.js'
import AdminHotel from '../adminHotel/adminHotel.model.js'

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

        // Verificar que la habitación exista y esté activa
        const habitacion = await Habitacion.findById(habitacionId)
        if (!habitacion || !habitacion.status) {
            return res.status(404).json(
                { message: 'Habitación no disponible o inactiva' }
            )
        }

        // Verificar que las fechas caen dentro de la disponibilidad general
        const estaDisponible = habitacion.availability.some(rango => {
            return (
                new Date(fromDate) >= new Date(rango.from) &&
                new Date(toDate) <= new Date(rango.to)
            )
        })

        if (!estaDisponible) {
            return res.status(400).json(
                { message: 'Las fechas no están dentro del rango de disponibilidad de la habitación' }
            )
        }

        // Verificar que no haya conflictos con otras reservas confirmadas o pendientes
        const reservasConflicto = await Reserva.find({
            habitacion: habitacionId,
            estado: { $in: ['pendiente', 'confirmada'] },
            $or: [
                {
                    fromDate: { $lt: new Date(toDate) },
                    toDate: { $gt: new Date(fromDate) }
                }
            ]
        })

        if (reservasConflicto.length > 0) {
            return res.status(400).json(
                { message: 'La habitación ya está reservada en esas fechas' }
            )
        }

        // Crear la reserva
        const nuevaReserva = new Reserva({
            habitacion: habitacionId,
            usuario: usuarioId,
            hotel: habitacion.hotel, // Lo obtenemos de la habitación
            fromDate,
            toDate,
            serviciosAdicionales,
            precioTotal
        })

        await nuevaReserva.save()

        return res.status(201).json({ 
            message: 'Reserva realizada con éxito', 
            reserva: nuevaReserva 
        })

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

        const hoy = new Date()

        // Verificar y actualizar estado a "finalizada" si aplica
        const reservasActualizadas = await Promise.all(
            reservas.map(async (reserva) => {
                if (reserva.estado === 'confirmada' && new Date(reserva.toDate) < hoy) {
                    reserva.estado = 'finalizada'
                    await reserva.save()
                }
                return reserva
            })
        )

        res.json(reservasActualizadas)

    } catch (error) {
        console.error('Error al obtener reservas:', error)
        return res.status(500).json({
            message: 'Error al obtener reservas',
            error: error?.message || 'Error inesperado'
        })
    }
}

// Obtener una reserva por su ID
export const obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('habitacion usuario hotel')

        if (!reserva) {
            return res.status(404).json(
                { message: 'Reserva no encontrada' }
            )
        }

        const hoy = new Date()
        if (reserva.estado === 'confirmada' && new Date(reserva.toDate) < hoy) {
            reserva.estado = 'finalizada'
            await reserva.save()
        }

        res.json(reserva)

    } catch (error) {
        console.error('Error al obtener reserva por ID:', error)
        return res.status(500).json({
            message: 'Error al obtener reserva',
            error: error?.message || 'Error inesperado'
        })
    }
}

// Confirmar una reserva (solo puede hacerlo admin de hotel)
export const confirmarReserva = async (req, res) => {
    try {
        const reservaId = req.params.id
        const adminHotelId = req.body.adminHotelId || req.query.adminHotelId // ESTO ES TEMPORAL
        /*
        const adminHotelId = req.user?.id // Asumiendo que aplicaremos middleware de autenticación
        */
       
        // Traer el admin con su hotel
        const admin = await AdminHotel.findById(adminHotelId)
        if (!admin || !admin.status) {
            return res.status(403).json(
                { message: 'Admin no autorizado' }
            )
        }

        const reserva = await Reserva.findById(reservaId)
        if (!reserva) {
            return res.status(404).json(
                { message: 'Reserva no encontrada' }
            )
        }

        // Verificar que la reserva pertenezca al hotel del admin
        if (reserva.hotel.toString() !== admin.hotel.toString()) {
            return res.status(403).json(
                { message: 'No puedes confirmar reservas de otros hoteles' }
            )
        }

        if (reserva.estado !== 'pendiente') {
            return res.status(400).json(
                { message: 'Solo se pueden confirmar reservas pendientes' }
            )
        }

        // Confirmar
        reserva.estado = 'confirmada'
        await reserva.save()

        res.json({ message: 'Reserva confirmada con éxito', reserva })

    } catch (error) {
        return res.status(500).json({
            message: 'Error al confirmar reserva',
            error: error.message
        })
    }
}

// Cancelar una reserva (Solo para el usuario/cliente)
export const cancelarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)

        if (!reserva) {
            return res.status(404).json(
                { message: 'Reserva no encontrada' }
            )
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