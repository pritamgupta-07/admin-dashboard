import mongoose from 'mongoose'

const avataSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId
    },
    avatarUrl:{
        type:String
    },
    publicId:{
        type:String
    }
}) 

const avatarModel = mongoose.model('avatar',avataSchema)

export default avatarModel