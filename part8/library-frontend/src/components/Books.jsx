import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: genre !== "all genres" ? { genre } : {},
    refetchQueries: { query: ALL_BOOKS },
  });

  const allBooks = useQuery(ALL_BOOKS, {
    variables: {},
  });

  if (!props.show) {
    return null;
  }

  if (filteredBooks.loading || allBooks.loading) {
    return <div>loading...</div>;
  }

  const books = filteredBooks.data.allBooks;

  const genres = [
    ...new Set(allBooks.data.allBooks.map((book) => book.genres).flat()),
    "all genres",
  ];

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
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
