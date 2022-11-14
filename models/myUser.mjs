import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const uri = process.env.MONGODB
mongoose.connect(uri)

const myUserSchema = mongoose.Schema({
    username: { type:   String, required: true },
    password: { type: String, required: true },
    confirmPass: { type: String, required: true }
})

myUserSchema.pre('save', async function (next) {
    const hashedPass = await bcrypt.hash(this.password, 12) 
    this.password = hashedPass
    this.confirmPass = undefined
    next()
})

const myUserModel = mongoose.model('myUser', myUserSchema)

export default myUserModel