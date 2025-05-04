import AdminPlataforma from './adminPlataforma.model.js'
import { encrypt } from '../../utils/encrypt.js'

// Crear nuevo admin plataforma
export const createAdminPlataforma = async (req, res) => {
    try {
        const { password, ...data } = req.body
  
        const hashedPassword = await encrypt(password)
        const newAdmin = new AdminPlataforma({ ...data, password: hashedPassword })
  
        await newAdmin.save()
        res.status(201).json(newAdmin)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error creando admin', 
                error: err.message 
            }
        )
    }
}

// Obtener todos los admins plataforma
export const getAllAdminsPlataforma = async (req, res) => {
    try {
        const admins = await AdminPlataforma.find({ status: true })
        res.json(admins)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error obteniendo admins', 
                error: err.message 
            }
        )
    }
}

// Obtener admin por ID
export const getAdminPlataformaById = async (req, res) => {
    try {
        const admin = await AdminPlataforma.findById(req.params.id)
        if (!admin || !admin.status) {
            return res.status(404).json({ message: 'Admin not found' })
        }
        res.json(admin)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error obteniendo admin', 
                error: err.message 
            }
        )
    }
}

// Actualizar admin
export const updateAdminPlataforma = async (req, res) => {
    try {
        const { password, ...data } = req.body

        if (password) {
            data.password = await encrypt(password)
        }

        const updatedAdmin = await AdminPlataforma.findByIdAndUpdate(
            req.params.id, 
            data, 
            { new: true }
        )

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        res.json(updatedAdmin)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error actualizando admin', 
                error: err.message 
            }
        )
    }
}

// Eliminar admin Plataforma (actualizar status: true/false)
export const deleteAdminPlataforma = async (req, res) => {
    try {
        const deleted = await AdminPlataforma.findByIdAndUpdate(
            req.params.id, 
            { status: false }, 
            { new: true }
        )
        res.json(
            { 
                message: 'Admin eliminado correctamente', 
                admin: deleted 
            }
        )
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error eliminando admin', 
                error: err.message 
            }
        )
    }
}
