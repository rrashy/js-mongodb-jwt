/* imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const app = express()

//Config JSON
app.use(express.json())

// Models
const User = require('./models/User')

//Rota aberta ou publica
app.get('/', (req,res) => {
    res.status(200).json({msg: "Bem-vindo a nossa API!"})
})

// Registrar usuario
app.post('/auth/register', async(req,res) => {

    const {name, email, password, confirmpassword} = req.body

    // Validaçoes
    if(!name){
        return res.status(422).json({msg:'O nome é obrigatorio'})
    }
    if(!email){
        return res.status(422).json({msg:'O email é obrigatorio'})
    }
    if(!password){
        return res.status(422).json({msg:'A senha é obrigatorio'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg:'As senahs nao concidem'})
    }

    // Checar existencia do usuario
    const userExists = await User.findOne({email: email})

    if(!userExists) {
        return res.status(404).json({msg:'Usuário não encontrado'})
    }
    
    // Checar se a senha bate
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({msg: 'Senha invalida!'})
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Criar usuario

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({msg: 'Usuário criado com sucesso!'})

    } catch(error) {
        console.log(error)

        res.status(500).json({msg: 'Aconteceu um erro no servidor!'})

    }
})
// Login
app.post("/auth/login", async (req,res) =>{

    const {email,password} = req.body

    //Validção
    if(!email){
        return res.status(422).json({msg:'O email é obrigatorio'})
    }

    if(!password){
        return res.status(422).json({msg:'A senha é obrigatorio'})
    }
})


// Credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.jkuu0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log('Conectou ao banco')
}).catch((err) => console.log(err))

