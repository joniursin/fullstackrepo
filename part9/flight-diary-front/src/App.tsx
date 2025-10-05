import React, { useEffect, useState } from "react";
import type { Diary } from "./types";
import { createDiary, getAllDiaries } from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiaryDate, setNewDiaryDate] = useState("");
  const [newDiaryVisibility, setNewDiaryVisibility] = useState("");
  const [newDiaryWeather, setNewDiaryWeather] = useState("");
  const [newDiaryComment, setNewDiaryComment] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: newDiaryDate,
      visibility: newDiaryVisibility,
      weather: newDiaryWeather,
      comment: newDiaryComment,
    }).then((data) => {
      setDiaries(diaries.concat(data));
    });
    setNewDiaryDate("");
    setNewDiaryVisibility("");
    setNewDiaryWeather("");
    setNewDiaryComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <br></br>
        <label>date</label>
        <input
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)}
        />
        <br></br>
        <label>visibility</label>
        <input
          value={newDiaryVisibility}
          onChange={(event) => setNewDiaryVisibility(event.target.value)}
        />
        <br></br>
        <label>weather</label>
        <input
          value={newDiaryWeather}
          onChange={(event) => setNewDiaryWeather(event.target.value)}
        />
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
