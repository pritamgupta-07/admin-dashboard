import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    id:{
        type:String
    },
    label:{
        type:String
    },
    value:{
        type:Number
    }, 
})
const pieChartModel = mongoose.model('pie',schema)

export default pieChartModel