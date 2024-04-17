import "./courses.css";
import { Header } from "../header/header";

export function UserCourses() {
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="h5 text-center"
          style={{
            marginTop: "10%",
          }}
        >
          Registered Courses
        </div>
      </div>
    </>
  );
}
