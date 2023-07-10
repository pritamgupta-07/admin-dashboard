import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    cost:{
        type:Number
    },
    phone:{
        type:String
    },
    date:{
        type:String
    }
})
const invoiceModel = mongoose.model('invoice',schema)

export default invoiceModel