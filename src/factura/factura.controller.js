import Invoice from '../factura/factura.model.js';
/*import Product from './product.model.js';
import Client from './client.model.js'; // Asegúrate de ajustar la ruta y nombre según tu modelo
*/

/* GESTIÓN DE FACTURAS */

// Ver todas las facturas activas
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ status: { $ne: 'CANCELADO' } });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ver factura por ID
export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findById(id)
            .populate('client', 'name email')
            .populate('products.product', 'name price');

        if (!invoice || invoice.status === 'CANCELLED') {
            return res.status(404).json({ mensaje: 'Factura no encontrada' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear nueva factura
export const createInvoice = async (req, res) => {
    try {
        const { client, products } = req.body;

        /*
        if (!products || products.length === 0) {
            return res.status(400).json({ mensaje: 'La factura debe contener al menos un producto' });
        }
        
        // Validar cliente
        const existingClient = await Client.findById(client);
        if (!existingClient || existingClient.status === false) {
            return res.status(404).json({ mensaje: 'Cliente no válido o inactivo' });
        }
        */
        // Calcular total
        
        /*
        let total = 0;
        for (const item of products) {
            
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ mensaje: `Producto con ID ${item.product} no encontrado` });
            }
            total += product.price * item.quantity;
        }
        */

        const invoice = new Invoice({
            client,
            products
            /*,
            total
            */
        });

        await invoice.save();

        res.status(201).json({ mensaje: 'Factura creada exitosamente', invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar factura
export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { products, status } = req.body;

        /*
        const invoice = await Invoice.findById(id);
        if (!invoice || invoice.status === 'CANCELADA') {
            return res.status(404).json({ mensaje: 'Factura no encontrada' });
        }
        */

        if (products) {
            let newTotal = 0;
            for (const item of products) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(404).json({ mensaje: `Producto con ID ${item.product} no encontrado` });
                }
                newTotal += product.price * item.quantity;
            }

            invoice.products = products;
            invoice.total = newTotal;
        }

        if (status) {
            invoice.status = status;
        }

        await invoice.save();

        res.status(200).json({ mensaje: 'Factura actualizada con éxito', invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancelar factura (borrado lógico)
export const cancelInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmation } = req.body;

        const invoice = await Invoice.findById(id);
        if (!invoice || invoice.status === 'CANCELADA') {
            return res.status(404).json({ mensaje: 'Factura no encontrada' });
        }

        if (confirmation !== 'CONFIRM') {
            return res.status(400).json({ mensaje: 'Se requiere confirmación para cancelar la factura' });
        }

        invoice.status = 'CANCELLED';
        await invoice.save();

        res.status(200).json({ mensaje: 'Factura cancelada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};