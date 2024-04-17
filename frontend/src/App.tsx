import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InstructorCourses } from "./instructor/courses/courses";
import { InstructorPayments } from "./instructor/payments/payments";
import { InstructorLogin } from "./instructor/login/login";
import { UserLogin } from "./user/login/login";
import { UserCourses } from "./user/courses/courses";
import { UserHome } from "./user/home/home";
import {UserVideos} from "./user/videos/videos";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/payments" element={<InstructorPayments />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/courses" element={<UserCourses />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/user/videos" element={<UserVideos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
