import { Router } from "express";
import { Fishka } from "./modules/model.js";
import { fishkaJoiSchema } from "./modules/model.js";

export const api = Router();

api.get("/cards", async (req, res) => {
  try {
    const fishkas = await Fishka.find();
    res.json({ fishkas });
  } catch (error) {
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving data from the database.",
      });
  }
});

api.post("/cards", async (req, res) => {
  try {
    await fishkaJoiSchema.validateAsync(req.body);
    const { front, back, tags, author } = req.body;
    if (!front || !back)
      return res
        .status(400)
        .json({ error: "Required fields: front and back!!" });
    const newFishka = Fishka.create({ front, back, tags, author });
    return res.status(201).json(newFishka);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
