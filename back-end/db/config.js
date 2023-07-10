import mongoose from "mongoose";

function handleDatabase(url)
{
    mongoose.connect(url).then(()=>{console.log("database OK")}).catch((error)=>{console.log("connection failed",error)})
}

export default handleDatabase