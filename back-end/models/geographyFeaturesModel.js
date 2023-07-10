import mongoose from 'mongoose'

const schema = new mongoose.Schema({
        type:{
            type:String,
        },
        properties:{
            name:{
                type:String
            }
        },
        geometry:{
            type:{
                type:String
            },
            coordinates:[]
        },
        id:{
            type:String
        }
})
const geographyFeaturesModel = mongoose.model('geo-features',schema)

export default geographyFeaturesModel