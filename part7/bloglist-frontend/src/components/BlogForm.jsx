import { useState } from "react";
import { Button } from "react-bootstrap";

const BlogForm = ({ createBlog, user }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: {
        username: user.username,
        name: user.name,
        id: user.id,
      },
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder="author"
          />
        </div>
        <div>
          Url:{" "}
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            placeholder="url"
          />
        </div>
        <Button variant="success" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
