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
    res.status(500).send({ error: "something wrong" });
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
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

async function handleUpdateCalendarEvent(req, res) {
  try {
    const eventId = req.params.id;
    const { startStr, endStr } = req.body;
    if (eventId) {
      if (startStr && endStr) {
        const eventUpdated = await calendarModel.findOneAndUpdate(
          { _id: eventId },
          { start: startStr, end: endStr, expirationDate: endStr },
          { new: true }
        );
        if (eventUpdated) {
          res.status(200).send({ msg: "event updated" });
        } else {
          res
            .status(200)
            .send({ msg: "something wrong please try again later" });
        }
      } else {
        res.status(400).send({ msg: "please enter event data" });
      }
    } else {
      res.status(400).send({ msg: "please enter event id" });
    }
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

async function handleDeleteCalendarEvent(req, res) {
  try {
    const event = calendarModel.findOne({ _id: req.params.id });

    await event.deleteOne();
    res.status(200).send({ msg: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "something wrong" });
    console.log(error);
  }
}

export {
  handleGetCalendarEvent,
  handleCreateCalendarEvent,
  handleDeleteCalendarEvent,
  handleUpdateCalendarEvent,
};
