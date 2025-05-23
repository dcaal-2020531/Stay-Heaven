'use estrict'

import express from 'express' //SERVIDOR HTTP
import morgan from 'morgan' //LOGS
import helmet from 'helmet' //SEGURIDAD HTTP
import cors from 'cors' //ACCESO AL API
import empleadoRoutes from '../src/empleado/empleado.routes.js'
import facturaRoutes from '../src/factura/factura.routes.js'
import login from  '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import habitacionRoutes from '../src/habitacion/habitacion.routes.js'
import clientRoutes from '../src/Client/client.routes.js'
import eventRoutes from '../src/Events/events.routes.js'
import adminHotelRoutes from '../src/adminHotel/adminHotel.routes.js'
import adminPlataformaRoutes from '../src/adminPlataforma/adminPlataforma.routes.js'
import reservaRoutes from '../src/reserva/reserva.routes.js'
import statsRoutes from '../src/stats/stats.routes.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))    
}

const routes = (app)=>{
    app.use('/v1/empleado', empleadoRoutes)
    app.use('/v1/factura', facturaRoutes)
    app.use('/v1/login', login)
    app.use('/v1/hotel', hotelRoutes)
    app.use('/v1/habitacion', habitacionRoutes)
    app.use('/v1/client', clientRoutes)
    app.use('/v1/adminPlataforma', adminPlataformaRoutes)
    app.use('/v1/adminHotel', adminHotelRoutes)
    app.use('/v1/event', eventRoutes)
    app.use('/v1/reserva', reservaRoutes)
    app.use('/v1/stats', statsRoutes)
}



//ES NO ACEPTA EXPORTS CON .
export const initServer = async()=>{
    const app = express() //INSTANCIA DE EXPRESS
    try{
        configs(app) //APLICAR CONFIGURACIONES DEL SERVIDOR 

        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }

}
