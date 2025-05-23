import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { hotelesMasReservados, ocupacionPorHotel, reservasPorHotel } from './stats.controller.js'

const api = Router();

api.use(validateJwt)

api.get('/hoteles-mas-reservados', hotelesMasReservados)
api.get('/ocupacion-hotel', ocupacionPorHotel)
api.get('/reservas-por-hotel', reservasPorHotel)

export default api
