import transactionModel from "../models/transactionModel.js";

async function handleGetTransactionData(req, res) {
  try {
    const result = await transactionModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export default handleGetTransactionData;
