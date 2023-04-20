import { axiosInstance } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function UserDeleteModal({ userId }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    await axiosInstance
      .delete(`https://gorest.co.in/public/v2/users/${userId}`)
      .then((res) => {
        toast.success("User deleted successfully");
        handleClose();
        router.replace(router.asPath);
      });
  };

  return (
    <>
      <Button variant="light" onClick={handleShow} size="sm">
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
