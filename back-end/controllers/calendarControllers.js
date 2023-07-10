import calendarModel from "../models/calendarModel.js";

async function handleGetCalendarEvent(req, res) {
  try {
    const result = await calendarModel.find();
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ msg: "event does not exist" });
    }
  } catch (error) {
    res.status(500).send({error:'something wrong'})
    console.log(error);
  }
}

async function handleCreateCalendarEvent(req, res) {
  try {
    const event = new calendarModel(req.body);

    if (req.body.title) {
      await event.save();
      res.status(201).send({ msg: "event created successfully" });
    } else {
      res.status(400).send({ msg: "please provide title" });
    }
  } catch (error) {
    res.status(500).send({error:'something wrong'})
    console.log(error);
  }
}

async function handleDeleteCalendarEvent(req, res) {
  try {
    const event = calendarModel.findOne({ _id: req.params.id });

    await event.deleteOne();
    res.status(200).send({ msg: "deleted successfully" });
  } catch (error) {
    res.status(500).send({error:'something wrong'})
    console.log(error)
  }
}

export {
  handleGetCalendarEvent,
  handleCreateCalendarEvent,
  handleDeleteCalendarEvent,
};
