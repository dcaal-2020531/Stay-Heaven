import { Router } from 'express'
import {
    createAdminPlataforma,
    getAllAdminsPlataforma,
    getAdminPlataformaById,
    updateAdminPlataforma,
    deleteAdminPlataforma
} from './adminPlataforma.controller.js'

const api = Router()

// Crear admin plataforma
api.post(
    '/', 
    createAdminPlataforma
)

// Obtener todos los admins plataforma
api.get(
    '/', 
    getAllAdminsPlataforma
)

// Obtener un admin plataforma por ID
api.get(
    '/:id', 
    getAdminPlataformaById
)

// Actualizar admin plataforma
api.put(
    '/:id', 
    updateAdminPlataforma
)

// Eliminar admin plataforma
api.delete(
    '/:id', 
    deleteAdminPlataforma
)

export default api