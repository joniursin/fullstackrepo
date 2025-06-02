const BlogForm = ({addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange}) => {
    return (
        <form onSubmit={addBlog}>
            <div>title: <input value={newTitle} onChange={handleTitleChange} /></div>
            <div>Author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
            <div>Url: <input value={newUrl} onChange={handleUrlChange} /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm