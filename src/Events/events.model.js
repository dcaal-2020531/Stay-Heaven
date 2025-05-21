import { Schema, model } from 'mongoose';

const eventoSchema = Schema(
  {
    nombreEvento: {
      type: String,
      required: [true, 'Nombre del evento es obligatorio'],
    },
    tipoEvento: {
      type: String,
      required: [true, 'Tipo de evento es obligatorio'], // Ej: conferencia, boda, reunión
    },
    descripcion: {
      type: String,
      required: false,
    },
    fechaInicio: {
      type: Date,
      required: [true, 'Fecha de inicio es obligatoria'],
    },
    fechaFin: {
      type: Date,
      required: [true, 'Fecha de fin es obligatoria'],
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'El hotel asociado es obligatorio'],
    },
    estado: {
      type: String,
      enum: ['programado', 'modificado', 'cancelado'],
      default: 'programado',
    },
    recursos: [
      {
        nombreRecurso: {
          type: String,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    serviciosAdicionales: [
      {
        nombreServicio: {
          type: String,
          required: true,
        },
        descripcionServicio: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default model('Evento', eventoSchema)
