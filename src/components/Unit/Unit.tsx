import React from "react";
import CRUDUnit from "../CRUDUnit/CRUDUnit";

const Unit = () => {
  return (
    <div
      style={{
        background: "#eeeeee",
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CRUDUnit city={"Islamabad"} device="Wifi Router" />
    </div>
  );
};

export default Unit;
