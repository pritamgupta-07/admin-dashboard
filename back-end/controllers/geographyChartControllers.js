import geographyChartModel from "../models/geographyChartModel.js";

async function handleGetGeoData(req,res){
    try {
        const result = await geographyChartModel.find()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({error:'something wrong'})
        console.log(error)
    }
}


export default handleGetGeoData