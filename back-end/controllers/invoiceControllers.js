import invoiceModel from "../models/invoicesModel.js";

async function handleGetInvoices(req, res) {
  try {
    const result = await invoiceModel.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export { handleGetInvoices };
