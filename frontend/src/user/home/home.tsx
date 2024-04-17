import "./home.css";
import { Header } from "../header/header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import { api } from "../../utils/apiconfig";
import { Toaster, toast } from "react-hot-toast";
export function UserHome() {
  const paymentMode = useRef<HTMLSelectElement>(null);
  const [courses, setCourses] = useState([] as any);
  const [selectedCourse, setSelectedCourse] = useState({} as any);
  const [reviews, setReviews] = useState([] as any);
  const fetchCourses = async () => {
    try {
      const res = await api.get("courses");
      console.log(res.data, "res.data");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchCourses();
    }
    return () => {
      mounted = false;
    };
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Header />
      <section
        style={{
          marginTop: "4%",
        }}
      >
        <Slider {...settings}>
          <img src="./pic1.jpg" alt="" className="slickimage" />
          <img src="./elearning.jpg" alt="" className="slickimage" />
          <img src="./pic2.jpg" alt="" className="slickimage" />
        </Slider>
      </section>

      <section className="mt-5 container home">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="h5">Available Courses</div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <input
              type="search"
              className="form-control"
              placeholder="Search By CourseName"
              onKeyUp={async (e) => {
                try {
                  if (e.currentTarget.value === "") {
                    fetchCourses();
                    return;
                  }
                  console.log(e.currentTarget.value);
                  const res = await api.get(
                    `courses/search/${e.currentTarget.value}`
                  );
                  setCourses(res.data);
                } catch (error: any) {
                  toast.error(error.response.data.message);
                }
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          {courses.map((course: any) => (
            <div className="col-lg-3 col-md-3 col-sm-6 col-12" key={course.id}>
              <div className="card">
                <div className="card-body text-center">
                  <div>
                    <span className="h5">Name : </span>
                    <span className="h6">{course.name}</span>
                  </div>
                  <div>
                    <span className="h5">Duration : </span>
                    <span className="h6">{course.duration}</span>
                  </div>
                  <div>
                    <span className="h5">By : </span>
                    <span className="h6">{course.instructor?.name}</span>
                  </div>
                  <div>
                    <span className="h5">Price : </span>
                    <span className="h6"> Rs. {course.fee}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-success mt-3"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#paymentModal"
                      onClick={() => {
                        setSelectedCourse(course);
                      }}
                    >
                      Get It
                    </button>
                    <button
                    data-bs-toggle="modal"
                    data-bs-target="#reviewModal"
                      className="btn btn-secondary mt-3"
                      style={{
                        marginLeft: "10px",
                      }}
                      type="button"
                      onClick={async () => {
                        try {
                          const res = await api.get(`ratings/${course.id}`);
                          console.log(res.data,"reviews");
                          setReviews(res.data);
                        } catch (error: any) {
                          toast.error(error.response.data.message);
                        }
                      }}
                    >
                      View Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        className="modal fade"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Ratings & Reviews
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            {reviews.map((review:any, index:number) => {
                return (
                  <div key={index}>
                    <div>{review.user?.name}</div>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index}>
                        <i
                          className="fa-solid fa-star"
                          style={{
                            color: "#dda80ab3",
                          }}
                        ></i>
                      </span>
                    ))}

                    <div>Comment : {review.description}</div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="paymentModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Make Payment
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="h5">Course : </div>
                </div>
                <div className="col-6 text-end">
                  <div className="h6">{selectedCourse.name}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="h5">Duration : </div>
                </div>
                <div className="col-6 text-end">
                  <div className="h6">{selectedCourse.duration}</div>
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-6">
                  <div className="h5">Course By : </div>
                </div>
                <div className="col-6 text-end">
                  <div className="h6">{selectedCourse.instructor?.name}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="h5">Amount : </div>
                </div>
                <div className="col-6 text-end">
                  <div className="h6">Rs. {selectedCourse.fee}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <select
                    ref={paymentMode}
                    defaultValue={""}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled value="">
                      Select Payment Mode
                    </option>
                    <option value="UPI">UPI</option>
                    <option value="CARD">CARD</option>
                  </select>
                </div>
              </div>
              <div className="text-center">
                <button
                  data-bs-dismiss="modal"
                  className="btn btn-success mt-3"
                  type="button"
                  onClick={async () => {
                    try {
                      const user = JSON.parse(
                        sessionStorage.getItem("user") as string
                      );
                      const dataTosend = {
                        userId: user.id,
                        courseId: selectedCourse.id,
                        paidAmount: selectedCourse.fee,
                        paymentMode: paymentMode.current?.value,
                      };
                      await api.post("usercourses", dataTosend);
                      toast.success("Payment Success");
                    } catch (error) {
                      toast.error("Payment Failed");
                    }
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
