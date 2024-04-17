import "./courses.css";
import { Header } from "../header/header";
import { useEffect, useState, useRef } from "react";
import { api, config } from "../../utils/apiconfig";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
export function InstructorCourses() {
  const addForm = useForm();
  const editForm = useForm();
  const vidieoForm = useForm();
  const [courses, setCourses] = useState([] as any[]);
  const [courseFiles, setCourseFiles] = useState([] as any[]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({} as any);
  const [videoId, setVideoId] = useState(0);
  const [payments, setPayments] = useState([] as any[]);
  const [selectedCourse, setSelectedCourse] = useState({} as any);
  const message = useRef<HTMLTextAreaElement>(null);
  const fetchCourses = async () => {
    try {
      const instructor = JSON.parse(
        sessionStorage.getItem("instructor") as string
      );
      const res = await api.get(`courses/instructor/${instructor.id}`);
      console.log(res.data, "res.data");
      setCourses(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
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
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="card"
          style={{
            marginTop: "6%",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="card-body">
            {editMode === false && <div className="h5">Create Course</div>}
            {editMode === true && <div className="h5">Edit Course</div>}
            <form>
              {editMode === false && (
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Course Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Course Name"
                      id="name"
                      {...addForm.register("name", {
                        required: "Field is required",
                      })}
                    />
                    {addForm.formState.errors.name && (
                      <div className="text-danger">
                        {addForm.formState.errors.name.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="duration" className="form-label">
                      Duration <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Duration"
                      id="duration"
                      {...addForm.register("duration", {
                        required: "Field is required",
                      })}
                    />
                    {addForm.formState.errors.duration && (
                      <div className="text-danger">
                        {addForm.formState.errors.duration.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="fee" className="form-label">
                      Fee <span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Fee"
                      id="fee"
                      {...addForm.register("fee", {
                        required: "Field is required",
                      })}
                    />
                    {addForm.formState.errors.fee && (
                      <div className="text-danger">
                        {addForm.formState.errors.fee.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <button
                      className="btn btn-primary mt-3"
                      type="submit"
                      onClick={addForm.handleSubmit(async (data) => {
                        try {
                          const instructor = JSON.parse(
                            sessionStorage.getItem("instructor") as string
                          );
                          const dataToSend = {
                            ...data,
                            instructorId: instructor.id,
                          };
                          await api.post("courses", dataToSend);
                          addForm.reset();
                          toast.success("Course created successfully");
                        } catch (error: any) {
                          toast.error(error.response.data.message);
                        }
                      })}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
              {editMode === true && (
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Course Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Course Name"
                      id="name"
                      {...editForm.register("name", {
                        required: "Field is required",
                      })}
                    />
                    {editForm.formState.errors.name && (
                      <div className="text-danger">
                        {editForm.formState.errors.name.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="duration" className="form-label">
                      Duration <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Duration"
                      id="duration"
                      {...editForm.register("duration", {
                        required: "Field is required",
                      })}
                    />
                    {editForm.formState.errors.duration && (
                      <div className="text-danger">
                        {editForm.formState.errors.duration.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="fee" className="form-label">
                      Fee <span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Fee"
                      id="fee"
                      {...editForm.register("fee", {
                        required: "Field is required",
                      })}
                    />
                    {editForm.formState.errors.fee && (
                      <div className="text-danger">
                        {editForm.formState.errors.fee.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <button
                      className="btn btn-primary mt-3"
                      type="submit"
                      onClick={editForm.handleSubmit(async (data) => {
                        try {
                          await api.patch(`courses/${editData.id}`, data);
                          setEditMode(false);
                          fetchCourses();
                          toast.success("Course updated successfully");
                        } catch (error: any) {
                          toast.error(error.response.data.message);
                        }
                      })}
                    >
                      Submit
                    </button>
                    <button
                      style={{
                        marginLeft: "10px",
                      }}
                      className="btn btn-danger mt-3"
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <div className="h5">Courses</div>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Fee</th>
                  <th>View Videos</th>
                  <th>Add Videos</th>
                  <th>View Payments</th>
                  <th>Notify Customers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course: any, index: number) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.name}</td>
                    <td>{course.duration}</td>
                    <td>{course.fee}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#viewVideoModal"
                        onClick={() => {
                          setCourseFiles(course.courseFiles);
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#addVideoModal"
                        onClick={() => {
                          setVideoId(course.id);
                        }}
                      >
                        Add
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#paymentsModal"
                        onClick={async () => {
                          try {
                            const res = await api.get(
                              `usercourses/course/${course.id}`
                            );
                            setPayments(res.data);
                          } catch (error: any) {
                            toast.error(error.response.data.message);
                          }
                        }}
                      >
                        Payments
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#notifyModal"
                        onClick={() => {
                          setSelectedCourse(course);
                        }}
                      >
                        Notify
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                          setEditMode(true);
                          setEditData(course);
                          editForm.setValue("name", course.name);
                          editForm.setValue("duration", course.duration);
                          editForm.setValue("fee", course.fee);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await api.delete(`courses/${course.id}`);
                            fetchCourses();
                            toast.success("Course deleted successfully");
                          } catch (error: any) {
                            toast.error(error.response.data.message);
                          }
                        }}
                        className="btn btn-danger"
                        style={{
                          marginLeft: "5px",
                        }}
                        type="button"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="notifyModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Notify Customers
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
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      ref={message}
                      className="form-control"
                      placeholder="Leave a message here"
                      id="floatingTextarea"
                    ></textarea>
                    <label htmlFor="floatingTextarea">Message</label>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary mt-3"
                    type="button"
                    onClick={async () => {
                      try {
                        console.log(selectedCourse, "selectedCourse");
                        await api.post("notifications", {
                          message: message.current?.value,
                          courseId: selectedCourse.id,
                        });
                        toast.success("Notifications sent successfully");
                      } catch (error: any) {
                        toast.error(error.response.data.message);
                      }
                    }}
                    data-bs-dismiss="modal"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="viewVideoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                view Videos, pdfs
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Video</th>
                    <th>PDF</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseFiles.map((file: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{file.name}</td>
                      <td
                        style={{
                          width: "30%",
                        }}
                      >
                        <video
                          src={`${config.videos}/${file.video}`}
                          controls
                          muted
                          style={{
                            width: "100%",
                          }}
                        ></video>
                      </td>
                      <td>
                        {file.pdf && (
                          <a
                            href={`${config.pdfs}/${file.pdf}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            PDF
                          </a>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={async () => {
                            try {
                              await api.delete(`coursefiles/${file.id}`);
                              fetchCourses();
                              toast.success("Video deleted successfully");
                            } catch (error: any) {
                              toast.error(error.response.data.message);
                            }
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
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
      {/* Add Video Modal */}
      <div
        className="modal fade"
        id="addVideoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Videos
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      id="name"
                      {...vidieoForm.register("name", {
                        required: "Field is required",
                      })}
                    />
                    {vidieoForm.formState.errors.name && (
                      <div className="text-danger">
                        {vidieoForm.formState.errors.name.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label htmlFor="video" className="form-label">
                      Video <span>*</span>
                    </label>
                    <input
                      accept="video/*"
                      type="file"
                      className="form-control"
                      id="video"
                      {...vidieoForm.register("video", {
                        required: "Field is required",
                      })}
                    />
                    {vidieoForm.formState.errors.video && (
                      <div className="text-danger">
                        {vidieoForm.formState.errors.video.message?.toString()}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label htmlFor="pdf" className="form-label">
                      PDF
                    </label>
                    <input
                      accept=".pdf"
                      type="file"
                      className="form-control"
                      id="pdf"
                      {...vidieoForm.register("pdf")}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={vidieoForm.handleSubmit(async (data) => {
                        try {
                          const formData = new FormData();
                          formData.append("courseId", videoId.toString());
                          formData.append("name", data.name);
                          formData.append("video", data.video[0]);
                          if (data.pdf) {
                            formData.append("pdf", data.pdf[0]);
                          } else {
                            formData.append("pdf", "");
                          }
                          await api.post(`coursefiles`, formData);
                          vidieoForm.reset();
                          fetchCourses();
                          toast.success("Video added successfully");
                        } catch (error: any) {
                          toast.error(error.response.data.message);
                        }
                      })}
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Modal */}
      <div
        className="modal fade"
        id="paymentsModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                View Payments
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Customer Details</th>
                    <th>Paid Amount</th>
                    <th>Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {payment.user.name} <br />
                        {payment.user.email}
                      </td>
                      <td>{payment.paidAmount}</td>
                      <td>{payment.paymentMode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
