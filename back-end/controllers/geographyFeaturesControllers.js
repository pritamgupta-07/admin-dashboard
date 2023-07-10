import geographyFeaturesModel from "../models/geographyFeaturesModel.js";

async function handleGetGeoFeatures(req, res) {
  try {
    const result = await geographyFeaturesModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export { handleGetGeoFeatures };
