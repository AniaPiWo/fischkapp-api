import { Router } from "express";
import { Fishka } from "./modules/model.js";
import { fishkaJoiSchema } from "./modules/model.js";

export const api = Router();

api.get("/cards", async (req, res) => {
  try {
    const fishkas = await Fishka.find().sort({ _id: -1 });
    res.json({ fishkas });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving data from the database.",
    });
  }
});

api.get("/cards/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const fishkas = await Fishka.find({ author: author }).sort({ _id: -1 });
    res.json({ fishkas });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving data from the database.",
    });
  }
});

api.get("/cards/tags/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    const fishkas = await Fishka.find({ tags: new RegExp(tag, "i") }).sort({
      _id: -1,
    });
    res.json({ fishkas });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving data from the database.",
    });
  }
});

api.get("/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reqFishkas = await Fishka.findOne({ _id: id });
    res.json({ reqFishkas });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

api.post("/cards", async (req, res) => {
  try {
    const { front, back, tags, author } = req.body;
    if (!front || !back)
      return res
        .status(400)
        .json({ error: "Required fields: front and back!" });
    const newFishka = await Fishka.create({ front, back, tags, author });
    return res.status(201).json(newFishka);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

api.patch("/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { front, back, tags, author } = req.body;

    const updatedFishka = await Fishka.findByIdAndUpdate(
      id,
      { front, back, tags, author },
      { new: true }
    );

    if (!updatedFishka) {
      return res.status(404).json({ error: "Card not found." });
    }
    return res.status(200).json(updatedFishka);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

api.delete("/cards/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const timestamp = mongoose.Types.ObjectId(id).getTimestamp();
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    if (timestamp <= fiveMinutesAgo) {
      const reqFishkas = await Fishka.findOneAndDelete({ _id: id });
      if (!reqFishkas) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.json({ reqFishkas });
    } else {
      return res
        .status(403)
        .json({
          error:
            "Cannot delete card. More than 5 minutes passed since creation.",
        });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
