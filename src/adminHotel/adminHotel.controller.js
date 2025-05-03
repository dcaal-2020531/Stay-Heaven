import AdminHotel from './adminHotel.model.js'
import { encrypt } from '../../utils/encrypt.js'

// Crear nuevo admin hotel
export const createAdminHotel = async (req, res) => {
    try {
        const { password, ...data } = req.body
    
        const hashedPassword = await encrypt(password)
        const newAdmin = new AdminHotel({ ...data, password: hashedPassword })
    
        await newAdmin.save()
        res.status(201).json(newAdmin)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error creating admin', 
                error: err.message 
            }
        )
    }
}

// Obtener todos los admins hotel
export const getAllAdminsHotel = async (req, res) => {
    try {
        const admins = await AdminHotel.find({ status: true }).populate('hotel')
        res.json(admins)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error getting admins', 
                error: err.message 
            }
        )
    }
}

// Obtener admin hotel por ID
export const getAdminHotelById = async (req, res) => {
    try {
        const admin = await AdminHotel.findById(req.params.id).populate('hotel')
        if (!admin || !admin.status) {
            return res.status(404).json({ message: 'Admin not found' })
        }
        res.json(admin)
    } catch (err) {
        res.status(500).json(
            { 
                message: 'Error getting admin', 
                error: err.message 
            }
        )
    }
}

// Actualizar admin hotel
export const updateAdminHotel = async (req, res) => {
    try {
        const { password, ...data } = req.body
    
        if (password) {
            data.password = await encrypt(password)
        }
    
        const updatedAdmin = await AdminHotel.findByIdAndUpdate(
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
                message: 'Error updating admin', 
                error: err.message 
            }
        )
    }
}

// Eliminar admin hotel
export const deleteAdminHotel = async (req, res) => {
    try {
        const deleted = await AdminHotel.findByIdAndUpdate(
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
                message: 'Error deleting admin', 
                error: err.message 
            }
        )
    }
}
