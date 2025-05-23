import { Router } from 'express'
import { login, register, test } from './auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { loginValidator, registerValidator } from '../../helpers/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.on.error.js'

const api = Router()

api.post('/addClient',  register )
api.post('/initLogin', login)


export default api