import Cliente from '../src/cliente/cliente.model.js'

export const existUsername = async(username)=>{
    const alreadyUsername = await Cliente.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}