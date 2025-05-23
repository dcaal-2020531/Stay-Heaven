import Reserva from '../reserva/reserva.model.js'
import Hotel from '../hotel/hotel.model.js'
import Habitacion from '../habitacion/habitacion.model.js'

export const hotelesMasReservados = async (req, res) => {
    try {
        const topHoteles = await Reserva.aggregate([
            { $group: { _id: '$hotel', totalReservas: { $sum: 1 } } },
            { $sort: { totalReservas: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'hotels',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'hotel'
                }
            },
            { $unwind: '$hotel' }
        ])

        res.json(topHoteles)
    } catch (error) {
        res.status(500).json({ message: 'Error generando reporte', error })
    }
}

export const ocupacionPorHotel = async (req, res) => {
    try {
        const hoteles = await Hotel.find();

        const estadisticas = await Promise.all(
            hoteles.map(async (hotel) => {
                const totalHabitaciones = await Habitacion.countDocuments({ hotel: hotel._id });

                const habitacionesOcupadas = await Reserva.distinct('habitacion', {
                    hotel: hotel._id,
                    estado: { $in: ['pendiente', 'confirmada'] }
                }).then(habitaciones => habitaciones.length);

                const ocupacion = totalHabitaciones > 0 
                    ? Number(((habitacionesOcupadas / totalHabitaciones) * 100).toFixed(2)) 
                    : 0;

                return {
                    hotel: hotel.name,
                    totalHabitaciones,
                    habitacionesOcupadas,
                    ocupacion
                };
            })
        );

        res.json(estadisticas);
    } catch (error) {
        res.status(500).json({ message: 'Error al calcular ocupación', error });
    }
}



export const reservasPorHotel = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('hotel usuario habitacion')
        const resumen = reservas.reduce((acc, reserva) => {
            const hotelId = reserva.hotel._id
            const hotelName = reserva.hotel.name

            if (!acc[hotelId]) {
                acc[hotelId] = {
                    hotelId,
                    hotelName,
                    totalReservas: 0,
                    reservas: []
                }
            }

            acc[hotelId].totalReservas++
            acc[hotelId].reservas.push(reserva)

            return acc
        }, {})

        res.json(Object.values(resumen))
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo detalles de reservas', error })
    }
}
