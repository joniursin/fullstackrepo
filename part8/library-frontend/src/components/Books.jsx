import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [books, setBooks] = useState("");
  const [allBooks, setAllBooks] = useState("");
  const [genre, setGenre] = useState("all genres");

  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
      setAllBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const genres = [...new Set(allBooks.map((book) => book.genres).flat())];
  genres.push("all genres");

  const byGenre = (genre) => {
    if (genre === "all genres") {
      setBooks(allBooks);
      setGenre(genre);
    } else {
      setBooks(allBooks.filter((book) => book.genres.includes(genre)));
      setGenre(genre);
    }
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{genre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => byGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
