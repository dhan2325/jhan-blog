import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogListing from "../components/BlogListing";

function BlogList({ posts }) {
  return (
    <>
      <Header />
      <div className="root">
        <h2>Blog Posts</h2>
        {posts.map((post) => (
          <BlogListing
            postTitle={post.title}
            postDate={"January 1, 2024"}
            postId={post.id}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default BlogList;
