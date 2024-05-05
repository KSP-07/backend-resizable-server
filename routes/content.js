const router = require("express").Router();
// const panelSchema = require("./modals/content")
const Panel = require("../modals/content");


router.post("/:id", async (req, res) => {

    const id = new Panel(req.params.id);
    const newData = new Panel(req.body.json);
    console.log(id)
    console.log(newData)
    try {
      const savedMessage = await newData.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router; 