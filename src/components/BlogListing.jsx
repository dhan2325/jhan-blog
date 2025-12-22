

function BlogListing({ postTitle, postDate, postId }) {
  return (
    <li>
      <a href={`/blog/${postId}`}>{postTitle}</a> ({postDate})
    </li>
  );
}

export default BlogListing;
