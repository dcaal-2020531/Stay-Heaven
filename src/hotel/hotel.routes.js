import {Router} from 'express'
import { deleteHotel, save, test, updateHoteles } from './hotel.controller.js';

const api = Router();

api.get('/test', test)
api.post('/', save)
api.delete('/:HotelId', deleteHotel)
api.put('/:HotelId',updateHoteles)

export default api