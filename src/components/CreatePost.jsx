import { useState, useContext } from "react";
import { MyContext } from "../App";

// save the initial post in local storage so that it persists across page refreshes
function getInitialPost() {
  const title = localStorage.getItem("title");
  const content = localStorage.getItem("content");

  return {
    title: title || "",
    content: content || "",
  };
}

export default function CreatePost() {
  const [post, setPost] = useState(getInitialPost);
  const context = useContext(MyContext); // get the context from the App component

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
    localStorage.setItem(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.setPosts([...context.posts, post]);
    localStorage.clear(); // clear the local storage after the post is submitted
    setPost(getInitialPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={post.title}
        ></input>
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          onChange={handleChange}
          value={post.content}
          cols={50}
          rows={5}
        ></textarea>
      </label>
      <br />
      <input type="submit" value="Post!"></input>
    </form>
  );
}
