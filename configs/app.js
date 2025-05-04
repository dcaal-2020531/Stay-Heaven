'use strict'

import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import adminPlataformaRoutes from '../src/adminPlataforma/adminPlataforma.routes.js'
import adminHotelRoutes from '../src/adminHotel/adminHotel.routes.js'
import habitacionRoutes from '../src/habitacion/habitacion.routes.js'

const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

    const routes = (app)=>{
        app.use('/hotel', hotelRoutes)
        app.use('/adminPlataforma', adminPlataformaRoutes)
        app.use('/adminHotel', adminHotelRoutes)
        app.use('/habitacion', habitacionRoutes)
    }

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}