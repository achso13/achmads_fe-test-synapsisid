import { axiosInstance } from "@/utils/api";

export async function getStaticPaths() {
  const { data: posts } = await axiosInstance.get("posts");
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: blocking,
  };
}
export async function getStaticProps({ params }) {
  const { data: post } = await axiosInstance.get(`posts/${params.id}`);

  const { data: comment } = await axiosInstance.get(
    `posts/${params.id}/comments`
  );

  return {
    props: {
      post,
      comment,
    },
  };
}

export default function Blog({ post, comment }) {
  return (
    <>
      <h1 className="my-4">{post.title}</h1>
      <p className="my-4">{post.body}</p>

      <div className="my-4">
        <h5>Comments {comment.length > 0 && `(${comment.length})`}</h5>
        {comment.length === 0 ? (
          <p className="text-muted">No comments found</p>
        ) : (
          <>
            {comment.map((comment) => (
              <div
                key={comment.id}
                className="border-bottom p-3 bg-white rounded shadow-sm"
              >
                <p className="m-0 fw-semibold">{comment.name}</p>
                <p className="text-muted m-0">{comment.body}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
