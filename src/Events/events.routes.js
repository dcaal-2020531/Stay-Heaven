import {Router} from 'express'
import { deleteEvent, save, test, updateEventes, getAll } from './events.controller.js';

const api = Router();

api.get('/getAll', getAll)
api.post('/', save)
api.delete('/:EventId', deleteEvent)
api.put('/:EventId',updateEventes)

export default api