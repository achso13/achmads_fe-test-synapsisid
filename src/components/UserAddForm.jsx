import { axiosInstance } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function UserAddForm() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
    setError({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      status: formData.get("status"),
    };

    axiosInstance
      .post("users", user)
      .then((res) => {
        toast.success("User added successfully");
        handleClose();
        router.replace(router.asPath);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          const errors = {};
          err.response.data.forEach((error) => {
            errors[error.field] = error.message;
          });
          setError(errors);
        }
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                isInvalid={error.name}
              />
              <Form.Control.Feedback type="invalid">
                {`Name ${error.name}`}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                isInvalid={error.email}
              />
              <Form.Control.Feedback type="invalid">
                {`Email ${error.email}`}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                id="male"
                value="male"
                isInvalid={error.gender}
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                id="female"
                value="female"
                isInvalid={error.gender}
                feedback={`Gender ${error.gender}`}
                feedbackType="invalid"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="radio"
                label="Active"
                name="status"
                id="active"
                value="active"
                isInvalid={error.status}
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Inactive"
                name="status"
                id="inactive"
                value="inactive"
                isInvalid={error.status}
                feedback={`Status ${error.status}`}
                feedbackType="invalid"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
