

function BlogListing({ postTitle, postDate, postId }) {
  return (
    <div className="text-box">
      <a href={`/blog/${postId}`}>{postTitle}</a> ({postDate})
    </div >
  );
}

export default BlogListing;
