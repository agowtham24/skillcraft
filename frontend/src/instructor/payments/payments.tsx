import "./payments.css";
import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { api } from "../../utils/apiconfig";
import { Toaster, toast } from "react-hot-toast";

export function InstructorPayments() {
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="h5 text-center"
          style={{
            marginTop: "6%",
          }}
        ></div>
      </div>
    </>
  );
}
