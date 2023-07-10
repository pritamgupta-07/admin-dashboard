import barChartModel from "../models/barChartModel.js";

async function handleGetBarData(req, res) {
  try {
    const result = await barChartModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export default handleGetBarData;
