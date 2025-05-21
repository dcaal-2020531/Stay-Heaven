import Event from "./events.model.js"


export const test = (req, res) => {
    return res.send({ message: 'Funciona la wea' })
}

export const getAll = async (req,res) =>{
    try {
        const events = await Event.find()
        if (events.length === 0) {
            return res.status(404).send({ message: 'Evenet not found' });
        }
        return res.send({ message: 'Evenet found', events });
    } catch (err) {
    console.error(err);
    return res.status(500).send({message: "Error retrivering Events"})        
    }
}

export const save = async(req, res) => {
    try {
        const data = req.body
        const event = new Event(data)
        await event.save()
        return res.send(
            {
                success: true,
                message: `Event created successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when creating event',
                err
            }
        )
    }
}

export const updateEventes = async (req, res) => {
    try {
        const { EventId } = req.params;
        const updates = req.body;

        const existingEvent = await Event.findById(EventId);
        if (!existingEvent) {
            return res.status(404).send({ message: 'Event not found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(EventId, updates, { new: true });

        return res.send({ message: 'Event updated successfully', updatedEvent });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Event', err });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const { EventId } = req.params;

        const existingEvent = await Event.findById(EventId);
        if (!existingEvent) {
            return res.status(404).send({ message: 'Event not found' });
        }

        await Event.findByIdAndDelete(EventId);

        return res.send({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Event', err });
    }
}
