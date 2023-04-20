import { useRouter } from "next/router";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";

export default function UserSearchForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    router.push(`/users?name=${name}`);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control placeholder="Search user" name="name" />
        <Button
          variant="primary"
          type="submit"
          className="d-flex align-items-center"
        >
          <BiSearchAlt />
        </Button>
      </InputGroup>
    </Form>
  );
}
