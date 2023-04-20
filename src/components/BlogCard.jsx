import Link from "next/link";
import { Card } from "react-bootstrap";

export default function BlogCard({ blog }) {
  const { id, title, body } = blog;
  return (
    <Card style={{ height: "100%" }} className="border-0 shadow-sm">
      <Card.Body>
        <Card.Title>
          {title.length > 50 ? title.substring(0, 50) + "..." : title}
        </Card.Title>
        <Card.Text>
          {body.length > 100 ? body.substring(0, 100) + "..." : body}
        </Card.Text>
        <Link href={`/blogs/${id}`} legacyBehavior passHref>
          See more
        </Link>
      </Card.Body>
    </Card>
  );
}
