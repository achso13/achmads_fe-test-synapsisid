import PaginationList from "@/components/PaginationList";
import UserAddForm from "@/components/UserAddForm";
import UserSearchForm from "@/components/UserSearchForm";
import UserTable from "@/components/UserTable";
import { axiosInstance } from "@/utils/api";

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const name = query.name || "";
  const { data: users, headers } = await axiosInstance.get(
    `users?page=${page}&name=${name}`
  );
  return {
    props: {
      users,
      page: headers["x-pagination-page"],
      totalPages: headers["x-pagination-pages"],
    },
  };
}
export default function Users({ users, page, totalPages }) {
  return (
    <>
      <div className="my-3 d-flex flex-row align-items-center justify-content-between">
        <div>
          <p className="text-muted m-0">Manage Users Data</p>
          <h1 className="m-0">Users</h1>
        </div>
        <div className="d-flex gap-2 flex-column-reverse flex-md-row align-items-end justify-content-end">
          <UserSearchForm />
          <UserAddForm />
        </div>
      </div>

      {users.length === 0 ? (
        <h3 className="text-center">No users found</h3>
      ) : (
        <>
          <div className="bg-white py-3 px-4 rounded shadow-sm">
            <UserTable users={users} />
          </div>
          <PaginationList page={page} totalPages={totalPages} url="users" />
        </>
      )}
    </>
  );
}
