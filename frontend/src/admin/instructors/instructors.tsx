import "./instructor.css";
import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { api } from "../../utils/apiconfig";
import { toast, Toaster } from "react-hot-toast";
export function AdminInstructors() {
  const [users, setUsers] = useState([] as any[]);
  const fetchUsers = async () => {
    try {
      const res = await api.get(`instructors`);
      console.log(res.data, "instructors");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchUsers();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div
          style={{
            marginTop: "60px",
          }}
          className="h5 text-center"
        >
          Instructors List
        </div>
        <div>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={async () => {
                          try {
                            await api.delete(`instructors/${user.id}`);
                            toast.success("instructors Deleted Successfully");
                            fetchUsers();
                          } catch (error: any) {
                            toast.error(error.response.data.msg);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </>
  );
}
