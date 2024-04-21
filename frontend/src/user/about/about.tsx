import "./about.css";
import { Header } from "../header/header";
export function About() {
  const cardBackground = {
    backgroundImage: `url('/about.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "1",
    minHeight: "355px",
    borderRadius: "10px",
    marginTop: "70px",
  };
  return (
    <>
      <Header />
      <div className="container">
        <div style={cardBackground}>
          <div
            style={{
              height: "355px",
              backgroundColor: "#00000061",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            {/* <div className="h3 text-light">About Us</div> */}
          </div>
        </div>
        <div className="row mt-4">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="fs-5 text-warning">ABOUT OUR ONLINE Platform</div>
              <div className="h4">Hello,</div>
              <div className="h4">with 25+ Years Of Experience</div>
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  fontWeight: "600",
                }}
              >
                We are a team of passionate people whose goal is to improve
                everyone's life through disruptive products. We build great
                products to solve your business problems.
              </p>
              <p>
                Our products are designed for small to medium size companies
                willing to optimize their performance. We are a team of
                passionate people whose goal is to improve everyone's life
                through disruptive products. We build great products to solve
                your business problems. Our products are designed for small to
                medium size companies willing to optimize their performance. We
                are a team of passionate people whose goal is to improve
                everyone's life through disruptive products. We build great
                products to solve your business problems.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 imgcol">
              <img
                className="imgaboutus"
                src="/aboutus.jpg"
                alt="aboutus"
              />

              <img
                src="/contactus.jpg"
                className="smallpic"
                alt="aboutus"
              />
            </div>
          </div>
      </div>
    </>
  );
}
