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

// Ya no se utilizará porque se creó el CRUD de reserva
/*
// Reservar habitación (agrega un rango de fechas a availability)
export const reservarHabitacion = async (req, res) => {
    try {
        const { id } = req.params // ID de la habitación
        const { from, to } = req.body // Fechas a reservar

        const habitacion = await Habitacion.findById(id)
        if (!habitacion || !habitacion.status) {
            return res.status(404).json({ message: 'Habitación no encontrada o inactiva' })
        }

        // Verificar conflicto de fechas
        const hayConflicto = habitacion.availability.some(
            rango => {
                return (
                    new Date(from) < new Date(rango.to) &&
                    new Date(to) > new Date(rango.from)
                )
            }
        )

        if (hayConflicto) {
            return res.status(400).json({ message: 'La habitación no está disponible en esas fechas' })
        }

        // Agregar la nueva reserva (rango de fechas)
        habitacion.availability.push({ from, to })
        await habitacion.save()

        return res.status(200).json(
            { 
                message: 'Reserva realizada con éxito', 
                habitacion 
            }

        )
    } catch (error) {
        return res.status(500).json(
            { 
                message: 'Error al reservar habitación', 
                error 
            }
        )
    }
}
*/