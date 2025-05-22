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
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}

