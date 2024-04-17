import "./courses.css";
import { Header } from "../header/header";
import { api, config } from "../../utils/apiconfig";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export function UserCourses() {
  const comment = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState(0);
  const [courses, setCourses] = useState([] as any);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedCourseVideos, setSelectedCourseVideos] = useState([] as any[]);
  const [selectedCourse, setSelectedCourse] = useState({} as any);
  const fetchUserCourses = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") as string);
      const res = await api.get(`usercourses/${user.id}`);
      console.log(res.data, "res.data");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setReview = (rating: number, index: number) => {
    setRating(rating);
    const icons = document.querySelectorAll(".icon");
    icons[index].classList.add("activee");
    for (let i = 0; i < icons.length; i++) {
      if (i !== index) {
        icons[i].classList.remove("activee");
      }
    }
  };
  useEffect(() => {
    fetchUserCourses();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="h5 text-center"
          style={{
            marginTop: "6%",
          }}
        >
          <div className="row">
            {selectedVideo !== "" && (
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div>
                  <video
                    src={`${config.videos}/${selectedVideo}`}
                    controls
                    muted
                    style={{
                      width: "100%",
                    }}
                  ></video>
                </div>
              </div>
            )}
          </div>
          <div className="row mt-3">
            {selectedCourseVideos.length > 0 &&
              selectedCourseVideos.map((video: any, index: number) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 p-1"
                  key={video.id}
                >
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-lg-8 col-md-8 col-sm-7 col-12 text-start">
                          <div>
                            {index + 1 + " . " + video.name}{" "}
                            <span
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <i
                                style={{
                                  cursor: "pointer",
                                  fontSize: "20px",
                                }}
                                className="fa-regular fa-circle-play"
                                onClick={() => setSelectedVideo(video.video)}
                              ></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-5 col-12 text-end">
                          <a
                            href={`${config.pdfs}${video.pdf}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download Material
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Course Name</th>
                    <th>Duration</th>
                    <th>Paid Amount</th>
                    <th>Payment Mode</th>
                    <th>Start Course</th>
                    <th>Rate this Course</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 &&
                    courses.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.course?.name}</td>
                        <td>{item.course?.duration}</td>
                        <td>{item.paidAmount}</td>
                        <td>{item.paymentMode}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => setSelectedCourseVideos(item.files)}
                          >
                            Start Course
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#reviewModal"
                            onClick={() => setSelectedCourse(item)}
                          >
                            Give Rating
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h6" id="exampleModalLabel">
                Write your review here
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  const myModal = document.getElementById(
                    "reviewModal"
                  ) as HTMLElement;
                  myModal.style.display = "none";
                  myModal.classList.remove("show");
                }}
              ></button>
            </div>
            <div className="modal-body review">
              <div className="row justify-content-evenly">
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-angry icon"
                    onClick={() => setReview(1, 0)}
                  ></i>
                  <div className="h6 mt-1">poor</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-frown icon"
                    onClick={() => setReview(2, 1)}
                  ></i>
                  <div className="h6 mt-1">bad</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-meh icon"
                    onClick={() => setReview(3, 2)}
                  ></i>
                  <div className="h6 mt-1">average</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin icon"
                    onClick={() => setReview(4, 3)}
                  ></i>
                  <div className="h6 mt-1">good</div>
                </div>
                <div className="col-2">
                  <i
                    className="fa-solid fa-face-grin-stars icon"
                    onClick={() => setReview(5, 4)}
                  ></i>
                  <div className="h6 mt-1">excellent</div>
                </div>
              </div>
              <div className="mt-3">
                <textarea
                  ref={comment}
                  className="form-control"
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div className="mt-3 text-center">
                <button
                data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      const user = JSON.parse(
                        sessionStorage.getItem("user") as string
                      );
                      const res = await api.post("ratings", {
                        userId: user.id,
                        courseId: selectedCourse.courseId,
                        rating: rating,
                        description: comment.current?.value,
                      });
                      toast.success(res.data.message);
                    } catch (error: any) {
                      toast.error(error.response.data.message);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}
