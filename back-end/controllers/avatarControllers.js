import avatarModel from "../models/avatarModel.js";
import cloudinary from "../services/cloudinaryConfig.js";

// controller for Avatar Get method

async function handleGetAvatar(req, res) {
  try {
    const author = req.params.id;
    // validation
    if (author) {
      // finding avatar in DB & sending response
      const avatar = await avatarModel.findOne({ author });
      if(avatar){
        res.status(200).send(avatar);
      }else{
        res.status(200).send({msg: 'avatar does not exist'})
      }
    } else {
      res.status(400).send({ msg: "enter author id" });
    }
  } catch (error) {
    //error handling
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

// controller for Avatar upload method

async function handleUploadAvatar(req, res) {
  try {
    // validate params
    if (!req.file) {
      res.status(400).send({ msg: "please select a file" });
    } else {
      // uploading image to cloudinary
      const avatarResult = await cloudinary.uploader.upload(req.file.path);
      // creating instance of Avatar Model
      let avatar = new avatarModel({
        author: req.params.id,
        avatarUrl: avatarResult.secure_url,
        publicId: avatarResult.public_id,
      });
      // save & sending response
      avatar = await avatar.save();
      res.status(201).send(avatar);
    }
  } catch (error) {
    // error handling
    res.status(500).send({ error: " image upload failed" });
    console.log(error);
  }
}

// controller for Avatar Delete method

async function handleDeleteAvatar(req, res) {
  try {
    const publicId = req.params.pid;
    // validate params
    if (!publicId) {
      res.status(400).send({ msg: "please provide public id" });
    } else {
      // delete image from  cloudinary
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === "ok") {
        // delete from database
        await avatarModel.findOneAndDelete({ publicId });
        res.status(200).send({ msg: "successfully deleted" });
      } else {
        res.status(404).send({ msg: "image does not exist" });
      }
    }
  } catch (error) {
    // error handling
    res.status(500).send({ error: "failed! please try again later" });
    console.log(error);
  }
}

// controller for Avatar Update method

async function handleUpdateAvatar(req, res) {
  try {
    const publicId = req.params.pid;

    if (!publicId) {
      res.status(400).send({ msg: "please provide public id" });
    } else {
      // To delete an existing image
      const avatarDeleted = await cloudinary.uploader.destroy(publicId);

      if (avatarDeleted.result === "ok") {
        // uploading new image & updating document
        const avatarResult = await cloudinary.uploader.upload(req.file.path);

        let avatar = await avatarModel.findOneAndUpdate(
          { publicId: publicId },
          {
            publicId: avatarResult.public_id,
            avatarUrl: avatarResult.secure_url,
          },
          { new: true }
        );
        if (avatar) {
          // sending response for successful updation
          res.status(200).send({ msg: "successfully updated", avatar });
        } else {
          res.status(404).send({ msg: "avatar not updated" });
        }
      } else {
        // If public Id does not match in cloudinary folder
        res.status(404).send({ error: "image does not exist" });
      }
    }
  } catch (error) {
    // error handling
    res.status(500).send({ error: "something wrong please try again later" });
    console.log(error);
  }
}

export {
  handleGetAvatar,
  handleUploadAvatar,
  handleDeleteAvatar,
  handleUpdateAvatar,
};
