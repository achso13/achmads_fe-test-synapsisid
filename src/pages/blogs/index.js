import BlogCard from "@/components/BlogCard";
import PaginationList from "@/components/PaginationList";
import { axiosInstance } from "@/utils/api";
import { Col, Row } from "react-bootstrap";

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const { data: posts, headers } = await axiosInstance.get(
    `posts?page=${page}`
  );

  return {
    props: {
      posts,
      page: headers["x-pagination-page"],
      totalPages: headers["x-pagination-pages"],
    },
  };
}

export default function Blogs({ posts, page, totalPages }) {
  return (
    <>
      <h1 className="my-4">Blogs</h1>
      {posts.length === 0 ? (
        <h1>No blogs found</h1>
      ) : (
        <>
          <Row className="g-4 mb-5">
            {posts.map((post) => (
              <Col key={post.id} md={6}>
                <BlogCard blog={post} />
              </Col>
            ))}
          </Row>
          <PaginationList page={page} totalPages={totalPages} url="blogs" />
        </>
      )}
    </>
  );
}
