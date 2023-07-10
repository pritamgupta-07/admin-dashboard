import lineChartModel from "../models/lineChartModel.js";

async function handleGetLineData(req, res) {
  try {
    const result = await lineChartModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export default handleGetLineData;
