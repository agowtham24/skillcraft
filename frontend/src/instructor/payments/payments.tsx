import "./payments.css";
import { Header } from "../header/header";
export function InstructorPayments() {
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
          Payments
        </div>
      </div>
    </>
  );
}
