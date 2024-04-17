import "./courses.css";
import { Header } from "../header/header";
export function InstructorCourses() {
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
          Courses
        </div>
      </div>
    </>
  );
}
