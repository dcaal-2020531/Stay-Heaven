import Habitacion from './habitacion.model.js'

// Crear una nueva habitación
export const createHabitacion = async (req, res) => {
    try {
        const data = req.body

        const newRoom = new Habitacion(data)
        await newRoom.save()

        res.status(201).json(newRoom)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error al crear habitación', 
                error: err.message 
            }

        )
    }
}

// Obtener todas las habitaciones (opcional: filtrar por hotel)
export const getAllHabitaciones = async (req, res) => {
    try {
        const { hotelId } = req.query

        const query = hotelId ? { hotel: hotelId } : {}
        const rooms = await Habitacion.find(query).populate('hotel')

        res.json(rooms)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error al obtener habitaciones', 
                error: err.message 
            }
        )
    }
}

// Obtener habitación por ID
export const getHabitacionById = async (req, res) => {
    try {
        const habitacion = await Habitacion.findById(req.params.id).populate('hotel')

        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' })
        }

        res.json(habitacion)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error al obtener habitación', 
                error: err.message 
            }
        )
    }
}

// Actualizar habitación
export const updateHabitacion = async (req, res) => {
    try {
        const data = req.body

        const updated = await Habitacion.findByIdAndUpdate(req.params.id, data, { new: true })

        if (!updated) {
            return res.status(404).json({ message: 'Habitación no encontrada' })
        }

        res.json(updated)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error al actualizar habitación', 
                error: err.message 
            }
        )
    }
}

// Eliminar habitación (actualizar status: true/false)
export const deleteHabitacion = async (req, res) => {
    try {
        const deleted = await Habitacion.findByIdAndUpdate(
            req.params.id, 
            { status: false }, 
            { new: true }
        )

        if (!deleted) {
            return res.status(404).json({ message: 'Habitación no encontrada' })
        }

        res.json(
            {
                message: 'Habitación eliminada correctamente',
                habitacion: deleted
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: 'Error eliminando habitación',
                error: err.message
            }
        )
    }
}

// Actualizar disponibilidad general de una habitación (solo puede hacerlo admin de hotel)
export const updateDisponibilidadHabitacion = async (req, res) => {
    try {
        const habitacionId = req.params.id
        const { availability } = req.body
        const adminHotelId = req.user?.id // Suponiendo autenticación activa

        // Obtener habitación
        const habitacion = await Habitacion.findById(habitacionId).populate('hotel')
        if (!habitacion) {
            return res.status(404).json(
                { message: 'Habitación no encontrada' }
            )
        }

        // Verificar que el admin sea del mismo hotel
        const admin = await AdminHotel.findById(adminHotelId)
        if (!admin || !admin.status || habitacion.hotel.toString() !== admin.hotel.toString()) {
            return res.status(403).json(
                { message: 'No tienes permiso para modificar esta habitación' }
            )
        }

        // Validar formato de availability
        if (!Array.isArray(availability) || availability.some(r => !r.from || !r.to)) {
            return res.status(400).json(
                { message: 'Formato de disponibilidad inválido' }
            )
        }

        // Actualizar
        habitacion.availability = availability
        await habitacion.save()

        res.json({
            message: 'Disponibilidad actualizada con éxito',
            habitacion
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error al actualizar disponibilidad',
            error: err.message
        })
    }
}