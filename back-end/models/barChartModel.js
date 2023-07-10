import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    country:{
        type:String,
    },
    hotdog:{
        type:Number
    },
    burger:{
        type:Number
    },
    kebab:{
        type:Number
    },
    donut:{
        type:Number
    },
    fries:{
        type:String
    },
    sandwich:{
        type:String
    }
})
const barChartModel = mongoose.model('bar',schema)

export default barChartModel