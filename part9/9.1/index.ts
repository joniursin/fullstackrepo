import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight)) || !height || !weight) {
    res.send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  res.send({ weight: Number(weight), height: Number(height), bmi: bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
