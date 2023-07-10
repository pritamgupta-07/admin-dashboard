import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        value:{
            type:Number
        }
    }
);



const geographyChartModel = mongoose.model('geography', schema);

export default geographyChartModel;
