import { Router } from 'express'
import { deleteCliente, getAll, save, test, updateCliente } from './client.controller.js';

const api = Router();

api.get('/getall', getAll)
api.post('/client', save)
api.delete('/:ClienteId', deleteCliente)
api.put('/:ClienteId', updateCliente)

export default api
