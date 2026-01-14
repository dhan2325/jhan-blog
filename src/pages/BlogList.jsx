import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogListing from "../components/BlogListing";

function BlogList({ posts }) {
  return (
    <>
      <Header />
      <div className="root">
        <h2>Blog Posts</h2>
        <ul>
        {posts.map((post) => (
          <BlogListing
            postTitle={post.title}
            postDate={post.date}
            postId={post.id}
          />
        ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default BlogList;
