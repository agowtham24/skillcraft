import "./videos.css"
import { Header } from "../header/header"

export function UserVideos() {
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
          Videos
        </div>
      </div>
    </>
  );
}