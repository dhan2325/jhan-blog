import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogReader from "./pages/BlogReader.jsx";


export const posts = [
  { id: "tauri", title: "My experience building with Tauri (v2)", date: "2024-03-11" },
  { id: "engsci_robo", title: "My take on the UofT Engineering Science/Robotics Program", date: "2024-01-01" },
  { id: "rust_intro", title: "My take on Rust, one year later", date: "2023-11-27" },
  { id: "slicer", title: "Building a 5-Axis 3D Printer Slicer in Rust", date: "2023-11-19" },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogList posts={posts} />} />
      <Route path="/blog/:id" element={<BlogReader />} />
    </Routes>
  );
}

export default App;
