import Cliente from '../Client/client.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        let cliente = new Cliente(data)

        cliente.password = await encrypt(cliente.password)
        cliente.role = 'CLIENT'

        await cliente.save()
        return res.send({message: `Registered successfully `})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let cliente = await Cliente.findOne({username}) 
        if(cliente && await checkPassword(cliente.password, password)) {
            let loggedCliente = { 
                uid: cliente._id,
                name: cliente.name,
                username: cliente.username,
                role: cliente.role
            }

            let token = await generateJwt(loggedCliente)

            return res.send(
                {
                    message: `Welcome`,
                    loggedCliente,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}