import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS);
  const resultUser = useQuery(CURRENT_USER);

  if (!props.show) {
    return null;
  }

  if (result.loading || resultUser.loading) {
    return <div>loading...</div>;
  }
  
  const user = resultUser.data.me;
  const books = result.data.allBooks.filter((book) => book.genres.includes(user.favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
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
    </div>
  );
};

export default Recommend;
