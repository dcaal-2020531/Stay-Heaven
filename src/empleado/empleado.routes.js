import { Router } from 'express';
import { 
    getAllEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deactivateEmployee 
} from './empleado.controller.js';
//import { validateJwt } from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/allemployees',  getAllEmployees); // Ver todos los empleados activos
api.get('/employee/:id',  getEmployeeById); // Ver un empleado por ID
api.post('/employee',  createEmployee); // Crear un nuevo empleado
api.put('/employee/:id',  updateEmployee); // Editar empleado
api.delete('/employee/:id',  deactivateEmployee); // Dar de baja un empleado

export default api;