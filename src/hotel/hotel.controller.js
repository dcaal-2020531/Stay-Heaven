import Hotel from "./hotel.model.js"


export const test = (req, res) => {
    return res.send({ message: 'Funciona la wea' })
}

export const getAll = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (hotels.length === 0) {
      return res.status(404).send({ message: 'Hotels not found' });
    }
    return res.status(200).send({ message: 'Hotels found', hoteles: hotels });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error retrieving hotels" });
  }
};

export const save = async(req, res) => {
    try {
        const data = req.body
        const hotel = new Hotel(data)
        await hotel.save()
        return res.send(
            {
                success: true,
                message: `Hotel created successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when creating hotel',
                err
            }
        )
    }
}

export const updateHoteles = async (req, res) => {
    try {
        const { HotelId } = req.params;
        const updates = req.body;

        const existingHotel = await Hotel.findById(HotelId);
        if (!existingHotel) {
            return res.status(404).send({ message: 'Hotel not found' });
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(HotelId, updates, { new: true });

        return res.send({ message: 'Hotel updated successfully', updatedHotel });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Hotel', err });
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const { HotelId } = req.params;

        const existingHotel = await Hotel.findById(HotelId);
        if (!existingHotel) {
            return res.status(404).send({ message: 'Hotel not found' });
        }

        await Hotel.findByIdAndDelete(HotelId);

        return res.send({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting Hotel', err });
    }
}
