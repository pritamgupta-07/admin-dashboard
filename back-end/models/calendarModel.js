import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title:{
        type:String,
    },
    start:{
        type:String,
    },
    end:{
        type:String
    },
    allday:{
        type:Boolean
    },
    expirationDate: { type: Date, expires: '24h' },
})
const calendarModel = mongoose.model('calendar',schema)

export default calendarModel