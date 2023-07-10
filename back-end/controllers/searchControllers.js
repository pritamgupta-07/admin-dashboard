import contactsModel from "../models/contactsModel.js";
import invoiceModel from "../models/invoicesModel.js";
import teamModel from "../models/teamsModel.js";

// Team Search Operation

async function handleTeamSearchOperation(req, res) {
  try {
    const teamSearchResult = await teamModel.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { email: { $regex: req.params.key, $options: "i" } },
      ],
    }).select('-password');

    if (teamSearchResult.length > 0) {
      res.status(200).send({ teamSearchResult });
    } else {
      res.status(200).send({ msg: "no result found" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

// Contact Search Operation

async function handleContactSearchOperation(req, res) {
  try {
    const contactSearchResult = await contactsModel.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { email: { $regex: req.params.key, $options: "i" } },
        { address: { $regex: req.params.key, $options: "i" } },
        { city: { $regex: req.params.key, $options: "i" } },
      ],
    });

    if (contactSearchResult.length > 0) {
      res.status(200).send({ contactSearchResult });
    } else {
      res.status(200).send({ msg: "no result found" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

// Invoice Search Operation

async function handleInvoiceSearchOperation(req, res) {
  try {
    const invoiceSearchResult = await invoiceModel.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { email: { $regex: req.params.key, $options: "i" } },
        { date: { $regex: req.params.key, $options: "i" } },
      ],
    });

    if (invoiceSearchResult.length > 0) {
      res.status(200).send({ invoiceSearchResult });
    } else {
      res.status(200).send({ msg: "no result found" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export {
  handleContactSearchOperation,
  handleInvoiceSearchOperation,
  handleTeamSearchOperation,
};
