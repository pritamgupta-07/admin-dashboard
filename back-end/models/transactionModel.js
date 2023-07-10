import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    txId:{
        type:String,
    },
    user:{
        type:String,     
    },
    date:{
        type:String
    },
    cost:{
        type:String
    },
})
const transactionModel = mongoose.model('transactions',schema)

export default transactionModel