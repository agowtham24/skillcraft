import "./login.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../utils/apiconfig";
import { useNavigate } from "react-router-dom";

const userLoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
const userRegisterSchema = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),

  mobile: z
    .string()
    .nonempty({ message: "mobile cannot be empty" })
    .max(10, { message: "mobile must be 10 digits" }),
});

export function InstructorLogin() {
  const navigate = useNavigate();
  const userRegisterForm = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",

      mobile: "",
    },
  });
  const userLoginForm = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div>
      <div className="row m-0 mt-5 justify-content-center">
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          {showLoginForm ? (
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  No Account{" "}
                  <span
                    style={{ color: "blue" ,cursor:"pointer"}}
                    id="register"
                    onClick={() => {
                      setShowLoginForm(false);
                    }}
                  >
                    Register ?
                  </span>
                </p>
                <hr />
                <div className="h5 text-center">Instructor Login</div>
                <form>
                  <div className="row mt-5">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span>*</span>
                      </label>
                      <input
                        {...userLoginForm.register("email", { required: true })}
                        type="email"
                        className="form-control"
                       
                        id="email"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span>*</span>
                      </label>
                      <input
                        {...userLoginForm.register("password", {
                          required: true,
                        })}
                        type="password"
                        className="form-control"
                  
                        id="password"
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary mt-5"
                        type="submit"
                        onClick={userLoginForm.handleSubmit(async (data) => {
                          const res = await api.post("instructors/login", data);
                          if (res.status === 200) {
                            toast.success("Logged in successfully");
                            sessionStorage.setItem(
                              "instructor",
                              JSON.stringify(res.data)
                            );
                            userLoginForm.reset();
                            navigate("/instructor/courses");
                          } else {
                            toast.error(res.data.error);
                          }
                        })}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  Back to{" "}
                  <span
                    style={{ color: "blue" ,cursor:"pointer"}}
                    id="register"
                    onClick={() => {
                      setShowLoginForm(true);
                    }}
                  >
                    Login ?
                  </span>
                </p>
                <hr />
                <div className="h5 text-center">Instructor Register</div>
                <form>
                  <div className="row mt-5">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Name <span>*</span>
                      </label>
                      <input
                        {...userRegisterForm.register("name", {
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                   
                        id="name"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span>*</span>
                      </label>
                      <input
                        {...userRegisterForm.register("email", {
                          required: true,
                        })}
                        type="email"
                        className="form-control"
                      
                        id="email"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span>*</span>
                      </label>
                      <input
                        {...userRegisterForm.register("password", {
                          required: true,
                        })}
                        type="password"
                        className="form-control"
                     
                        id="password"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="mobile" className="form-label">
                        mobile <span>*</span>
                      </label>
                      <input
                        {...userRegisterForm.register("mobile", {
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                        maxLength={10}
                        id="mobile"
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary mt-5"
                        type="submit"
                        onClick={userRegisterForm.handleSubmit(async (data) => {
                          const res = await api.post("instructors", data);
                          if (res.status === 200) {
                            userRegisterForm.reset();
                            toast.success("Registered successfully");
                            setShowLoginForm(true);
                          } else {
                            toast.error(res.data.error);
                          }
                        })}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
