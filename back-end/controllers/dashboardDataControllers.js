import dashboardDataModel from "../models/dashboardDataModel.js";

async function handleGetDashboardData(req,res){
    try {
        const result = await dashboardDataModel.find()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({error:'something wrong'})
        console.log(error)
    }
}

export {handleGetDashboardData}