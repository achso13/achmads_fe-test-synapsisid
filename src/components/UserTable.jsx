import { Table } from "react-bootstrap";
import UserEditForm from "./UserEditForm";
import UserDeleteModal from "./UserDeleteModal";

export default function UserTable({ users }) {
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <div className="d-flex justify-content-end flex-row gap-2 align-items-center">
                <UserEditForm user={user} />
                <UserDeleteModal userId={user.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
