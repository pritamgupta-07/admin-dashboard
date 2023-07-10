import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    age:{
        type:Number
    },
    contact:{
        type:String
    },
    access:{
        type:String
    },
    password:{
        type:String
    },
})
const teamModel = mongoose.model('team',schema)

export default teamModel