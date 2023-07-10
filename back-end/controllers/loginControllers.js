import teamModel from "../models/teamsModel.js";
import { createToken } from "../services/jwtAuth.js";
import { comparePassword } from "../services/hashPassword.js";

async function handleLogin(req, res) {
  try {
    const { password, email } = req.body;

    if (email && password) {
      let result = await teamModel.findOne({ email: email });

      if (result) {
        // check password match or not
        const isPasswordMatched = await comparePassword(
          password,
          result.password
        );

        result = result.toObject();
        delete result.password;
        delete result.contact;

        if (isPasswordMatched) {
          const token = createToken(result);
          res.status(200).send({ result, token });
        } else {
          res.status(200).send({msg: "please enter correct passowrd" });
        }
      } else {
        res.status(200).send({msg: "please enter correct email" });
      }
    } else {
      res.status(400).send({ msg: "please enter all details" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export default handleLogin;
