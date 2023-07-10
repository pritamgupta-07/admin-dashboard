import avatarModel from "../models/avatarModel.js";
import teamModel from "../models/teamsModel.js";
import { comparePassword, generateHashedPassword } from "../services/hashPassword.js";

async function handleGetTeamData(req, res) {
  try {
    const result = await teamModel.find().select("-password");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

async function handleCreateTeam(req, res) {
  try {
    const hashedPassword = await generateHashedPassword(req.body.password);

    const newTeam = new teamModel({ ...req.body, password: hashedPassword });
    const result = await newTeam.save();

    if (result) {
      res.status(200).send({ msg: "User successfully created" });
    } else {
      res.status(400).send({ msg: "failed! please try again later" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

async function handleUpdateTeam(req, res) {
  try {
    const { name, email, contact, age, access, password} = req.body;
    const userProfile = await teamModel.findOne({_id: req.params.id})
  
    const isPasswordMatch = await comparePassword(password, userProfile.password)
    
    if(isPasswordMatch){
      const result = await teamModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          name: name,
          email: email,
          contact: contact,
          age: age,
          access: access,
        }
      );

      if (result) {
        res.status(200).send({ msg: "User successfully updated" });
      } else {
        res.status(400).send({ msg: "failed! please try again later" });
      }
    }else{
      res.status(200).send({status: 'incorrect password' , msg: 'please enter correct password'})
    }

  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

async function handleDeleteTeam(req, res) {
  try {
    const _id = req.params.id;
    const result = await teamModel.findOneAndDelete({ _id });
    await avatarModel.findOneAndDelete({ _id });

    if (result) {
      res.status(200).send({ msg: "User successfully deleted" });
    } else {
      res.status(400).send({ msg: "failed! please try again later" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export {
  handleGetTeamData,
  handleCreateTeam,
  handleUpdateTeam,
  handleDeleteTeam,
};
