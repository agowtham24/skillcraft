import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/apiconfig";
import { formatDate } from "../../sharedFunctions";
export function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [notifications, setNotifications] = useState([] as any[]);
  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") as string);
      const response = await api.get(`notifications/${user.id}`);
      console.log(response.data, "notifications");
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="navbox">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">Skill Craft</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginLeft: "45%" }}
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link to="/users/courses" className="nav-link">
                      Registered Courses
                    </Link>
                  </li>
                  <li className="nav-item dropdown position-relative">
                    <a
                      className="nav-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i
                        className="fa-solid fa-bell"
                        style={{
                          fontSize: "20px",
                        }}
                      ></i>
                      {notifications.length > 0 && (
                        <span className="position-absolute  translate-middle badge rounded-pill bg-danger">
                          {notifications.length}
                        </span>
                      )}
                    </a>
                    <ul
                      className="dropdown-menu"
                      style={{
                        width: "400px",
                        maxHeight: "500px",
                        overflowY: "auto",
                        padding: "13px",
                      }}
                    >
                      {notifications.map((notification: any) => (
                        <>
                          <li
                            style={{
                              cursor: "pointer",
                            }}
                            key={notification.id}
                            onClick={async () => {
                              try {
                                await api.patch(
                                  `notifications/${notification.id}`,
                                  { status: 1 }
                                );
                                fetchNotifications();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            {notification.message}
                            <span
                              style={{
                                float: "right",
                              }}
                            >
                              {formatDate(notification.createdAt)}
                            </span>
                          </li>
                          <hr />
                        </>
                      ))}
                    </ul>
                  </li>
                  <li
                    className="nav-item dropdown"
                    style={{
                      marginLeft: "15px",
                    }}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item aa"
                          onClick={() => {
                            sessionStorage.removeItem("user");
                            navigate("/");
                            window.location.reload();
                          }}
                        >
                          SignOut
                        </a>
                      </li>
                      <li>{/* <hr className="dropdown-divider" /> */}</li>
                      {/* <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/users/login" className="nav-link">
                    login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
