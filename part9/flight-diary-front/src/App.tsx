import React, { useEffect, useState } from "react";
import type { Diary, Visibility, Weather } from "./types";
import { createDiary, getAllDiaries } from "./services/diaries";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiaryDate, setNewDiaryDate] = useState("");
  const [newDiaryVisibility, setNewDiaryVisibility] = useState("");
  const [newDiaryWeather, setNewDiaryWeather] = useState("");
  const [newDiaryComment, setNewDiaryComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const data = await createDiary({
        date: newDiaryDate,
        visibility: newDiaryVisibility as Visibility,
        weather: newDiaryWeather as Weather,
        comment: newDiaryComment,
      });
      setDiaries(diaries.concat(data));

      setNewDiaryDate("");
      setNewDiaryVisibility("");
      setNewDiaryWeather("");
      setNewDiaryComment("");
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError("Unknown error occured");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <b>{error}</b>
      <form onSubmit={diaryCreation}>
        <br></br>
        <label>date</label>
        <input
          type="date"
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)}
        />
        <br></br>
        <div>
          visibility great{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setNewDiaryVisibility("great")}
          />
          good{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setNewDiaryVisibility("good")}
          />
          ok{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setNewDiaryVisibility("ok")}
          />
          poor{" "}
          <input
            type="radio"
            name="filterVisibility"
            onChange={() => setNewDiaryVisibility("poor")}
          />
        </div>
        <br></br>
        <div>
          weather sunny{" "}
          <input
            type="radio"
            name="filterWeather"
            onChange={() => setNewDiaryWeather("sunny")}
          />
          rainy{" "}
          <input
            type="radio"
            name="filterWeather"
            onChange={() => setNewDiaryWeather("rainy")}
          />
          cloudy{" "}
          <input
            type="radio"
            name="filterWeather"
            onChange={() => setNewDiaryWeather("cloudy")}
          />
          stormy{" "}
          <input
            type="radio"
            name="filterWeather"
            onChange={() => setNewDiaryWeather("stormy")}
          />
          windy{" "}
          <input
            type="radio"
            name="filterWeather"
            onChange={() => setNewDiaryWeather("windy")}
          />
        </div>
        <br></br>
        <label>comment</label>
        <input
          value={newDiaryComment}
          onChange={(event) => setNewDiaryComment(event.target.value)}
        />
        <br></br>
        <button type="submit">add</button>
      </form>

      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
