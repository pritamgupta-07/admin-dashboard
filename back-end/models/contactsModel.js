import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    zipcode:{
        type:String
    },
    registrarId:{
        type:Number
    }
})
const contactModel = mongoose.model('contact',schema)

export default contactModel