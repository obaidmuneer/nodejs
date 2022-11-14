import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

import myUserModel from './models/myUser.mjs'

const app = express()
const saltRound = 12
app.use(cors())
app.use(express.json())
dotenv.config()

app.post('/signup', async (req, res) => {
    // const hashedPass = await bcrypt.hash(req.body.password, +process.env.SALTROUND)

    myUserModel.create({
        username: req.body.username,
        password: req.body.password,
        confirmPass: req.body.confirmPass
    }, (err, savedData) => {
        if (!err) {
            res.send({
                msg: 'data saved',
                data: savedData
            })
        } else {
            console.log(err);
            res.send({
                msg: 'something went wrong'
            })
        }
    })

    // const data = await new myUserModel({

    // })

    // res.send({
    //     data: {
    //         username:req.body.username,
    //         password:hashedPass,
    //     }
    // })
})

app.post('/signin', async (req, res) => {
    try {
        const data = await myUserModel.findOne({ username: req.body.username })
        const match = await bcrypt.compare(req.body.password, data.password)
        if (match) {
            res.send({
                msg: 'login sucess'
            })
        }else{
            throw Error('lol')
        }

    } catch (error) {
        res.send({
            msg: 'something went wrong',
            err: error
        })
    }
    // const matched = await bcrypt.compare(req.body.password, req.body.hash)
    // if (matched) {
    //     res.send({
    //         msg: 'login sucess'
    //     })
    // } else {
    //     res.status(401).send({
    //         msg: 'login failed'
    //     })
    // }

})

app.get('/', (req, res) => {

    res.send({
        msg: 'hi'
    })
})


app.listen(8080, () => {
    console.log('server is running');
})