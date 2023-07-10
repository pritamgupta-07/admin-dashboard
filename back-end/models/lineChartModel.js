import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    id:{
        type:String,
    },
    data:[
            {
                x:String,
                y:Number
            }
        ]
})
const lineChartModel = mongoose.model('line',schema)

export default lineChartModel 