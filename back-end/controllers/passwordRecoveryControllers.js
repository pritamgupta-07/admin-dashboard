import teamModel from "../models/teamsModel.js";
import { generateHashedPassword } from "../services/hashPassword.js";
import { createToken, verifyLinkToken } from "../services/jwtAuth.js";
import { handleSendMail } from "../services/nodeMailer.js";

const hmtlTemplate = (id, token) =>
  `<div>
  <p >Click below to reset your password</p>
    <p> 
      <button style="padding: 4px 8px; background-color: #3da58a; border: none; border-radius: 4px;">
        <a style="text-decoration: none; color: white;" 
          href=http://localhost:3000/reset-password/${id}/${token}>
            reset password
        </a>
      </button>
    </p>
  </div>`;

async function handleForgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (email) {
      const userProfile = await teamModel.findOne({ email: email });

      if (userProfile) {
        const token = createToken(userProfile, "1h");
        const subject = "Reset your Dashboard password";
        const mailSentInfo = await handleSendMail(
          email,
          subject,
          hmtlTemplate(userProfile._id, token)
        );

        if (mailSentInfo) {
          res.status(200).send({ msg: `An Email has been sent to ${email}` });
        } else {
          res
            .status(500)
            .send({ msg: "something wrong please try again later" });
        }
      } else {
        res.status(200).send({
          status: "Incorrect email",
          msg: "User does not exist. Please enter correct email",
        });
      }
    } else {
      res.status(400).send({ msg: "please provide your email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "something wrong" });
  }
}

async function handleResetPassword(req, res) {
  try {
    const { token, id } = req.params;
    const isVerifiedLink = verifyLinkToken(token);

    if (isVerifiedLink) {
      const newPassword = req.body.newPassword;

      if (newPassword.length >= 8) {
        const hashedPassword = await generateHashedPassword(newPassword);
        const result = await teamModel.findOneAndUpdate(
          { _id: id },
          { password: hashedPassword },
          { new: true }
        );

        if (result) {
          res.status(200).send({
            msg: "password updated successfully.",
          });
        } else {
          res.status(200).send({ status: "invalid", msg: "invalid link" });
        }
      } else {
        res
          .status(400)
          .send({ msg: "password must have at least 8 character" });
      }
    } else {
      res.status(200).send({ status: "invalid", msg: "invalid link" });
    }
  } catch (error) {
    res.status(500).send({ msg: "something wrong" });
    console.log(error);
  }
}

export { handleForgotPassword, handleResetPassword };
