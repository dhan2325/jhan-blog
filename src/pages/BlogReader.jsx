import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import rehypeRaw from "rehype-raw";


function BlogReader() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  // 0: loading/waiting, 1: success, 2: error
  const [loadingState, setLoadingState] = useState(0);
  const fileName = `/blogs/${id}.md`;

  useEffect(() => {
    fetch(fileName)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setLoadingState(2);
        }
        return response.text();
      })
      .then((text) => {
        // check if default HTML returned
        if (text.toLowerCase().startsWith("<!doctype html>")) {
          setLoadingState(2);
          return;
        }
        setContent(text);
        setLoadingState(1);
      })
      .catch((error) => console.error("Error loading blog post:", error));
  }, [fileName]);

  const displayContent = loadingState === 1 ? (
    <div className="text-page">
      <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
    </div>

  ) : loadingState === 2 ? (
    <div className="text-page">Sorry, we couldn't find that one!</div>
  ) : (
    <div className="text-page">Loading...</div>
  );

  return (
    <>
      <Header />
      {displayContent}
      <Footer />
    </>
  );
}

export default BlogReader;
