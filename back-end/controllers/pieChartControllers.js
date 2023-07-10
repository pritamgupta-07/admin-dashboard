import pieChartModel from "../models/pieChartModel.js";

async function handleGetPieData(req, res) {
  try {
    const result = await pieChartModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export default handleGetPieData;
