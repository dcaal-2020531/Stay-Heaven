<<<<<<< HEAD
'use strict'

import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import clientRoutes from '../src/Client/client.routes.js'

const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

    const routes = (app)=>{
        app.use('/', hotelRoutes)
        app.use('/client', clientRoutes)
    }

export const initServer = async()=>{
    const app = express()
    try{
        configs(app)
=======
'use estrict'

import express from 'express' //SERVIDOR HTTP
import morgan from 'morgan' //LOGS
import helmet from 'helmet' //SEGURIDAD HTTP
import cors from 'cors' //ACCESO AL API
import empleadoRoutes from '../src/empleado/empleado.routes.js'
import facturaRoutes from '../src/factura/factura.routes.js'

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
}

//ES NO ACEPTA EXPORTS CON .
export const initServer = async()=>{
    const app = express() //INSTANCIA DE EXPRESS
    try{
        configs(app) //APLICAR CONFIGURACIONES DEL SERVIDOR 
>>>>>>> a-borja
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
