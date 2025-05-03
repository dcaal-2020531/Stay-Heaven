import { Router } from 'express';
import { getAllInvoices, getInvoiceById, createInvoice, updateInvoice, cancelInvoice } from './factura.controller.js';
// import { validateJwt } from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/todaslasfacturas', getAllInvoices); // Ver todas las facturas activas
api.get('/verfactura/:id', getInvoiceById); // Ver una factura por ID
api.post('/crearfactura', createInvoice); // Crear una nueva factura
api.put('/actualizarfactura/:id', updateInvoice); // Actualizar factura
api.delete('/canelarfactura/:id', cancelInvoice); // Cancelar factura (borrado lógico)

export default api;