import "./home.css";
import { Header } from "../header/header";
export function UserHome() {
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
          Home
        </div>
      </div>
    </>
  );
}
