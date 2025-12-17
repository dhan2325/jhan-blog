import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import rehypeRaw from "rehype-raw";


function BlogReader() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const fileName = `/src/assets/blogs/${id}.md`;

  useEffect(() => {
    fetch(fileName)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading blog post:", error));
  }, [fileName]);

  return (
    <>
      <Header />
      <div className="text-page">
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
      <Footer />
    </>
  );
}

export default BlogReader;
