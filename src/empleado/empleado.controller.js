import Employee from './empleado.model.js'; // Asegúrate de tener la ruta correcta
import bcrypt from 'bcrypt';

/* GESTIÓN DE EMPLEADOS */

// Ver todos los empleados activos
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ status: true }); // Solo empleados activos
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ver empleado por ID
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee || !employee.status) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear nuevo empleado
export const createEmployee = async (req, res) => {
    try {
        const { name, surname, email, password, role } = req.body;

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = new Employee({
            name,
            surname,
            email,
            password: hashedPassword,
            role
        });

        await employee.save();

        res.status(201).json({ mensaje: 'Empleado creado exitosamente', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar empleado
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, password, role } = req.body;

        const employee = await Employee.findById(id);
        if (!employee || !employee.status) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        // Validar si se actualizará la contraseña
        if (password) {
            employee.password = await bcrypt.hash(password, 10);
        }

        // Actualizar los campos si se proporcionan
        employee.name = name || employee.name;
        employee.surname = surname || employee.surname;
        employee.email = email || employee.email;
        employee.role = role || employee.role;

        await employee.save();

        res.status(200).json({ mensaje: 'Empleado actualizado con éxito', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dar de baja a un empleado (borrado lógico)
export const deactivateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmation } = req.body;

        const employee = await Employee.findById(id);
        if (!employee || !employee.status) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        // Verificar confirmación
        if (!confirmation || confirmation !== 'CONFIRM') {
            return res.status(400).json({ mensaje: 'Se requiere confirmación para dar de baja al empleado' });
        }

        // Desactivar al empleado
        employee.status = false;
        await employee.save();

        res.status(200).json({ mensaje: 'Empleado dado de baja con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};