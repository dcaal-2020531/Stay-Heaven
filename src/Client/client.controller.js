import Cliente from "./client.model.js"

export const test = (req, res) => {
    return res.send({ message: 'Funciona la wea' })
}

export const getAll = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        if (clientes.length === 0) {
            return res.status(404).send({ message: 'Clientes not found' });
        }
        return res.send({ message: 'Clientes found', clientes });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error retrieving Clientes" });
    }
}

export const save = async (req, res) => {
    try {
        const data = req.body;
        const cliente = new Cliente(data);
        await cliente.save();
        return res.send({
            success: true,
            message: `Cliente created successfully`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when creating Cliente',
            err
        });
    }
}

export const updateCliente = async (req, res) => {
    try {
        const { ClienteId } = req.params;
        const updates = req.body;

        const existingCliente = await Cliente.findById(ClienteId);
        if (!existingCliente) {
            return res.status(404).send({ message: 'Cliente not found' });
        }

        const updatedCliente = await Cliente.findByIdAndUpdate(ClienteId, updates, { new: true });

        return res.send({ message: 'Cliente updated successfully', updatedCliente });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Cliente', err });
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const { ClienteId } = req.params;

        const existingCliente = await Cliente.findById(ClienteId);
        if (!existingCliente) {
            return res.status(404).send({ message: 'Cliente not found' });
        }

        await Cliente.findByIdAndDelete(ClienteId);

        return res.send({ message: 'Cliente deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Cliente', err });
    }
}
