import React, { useContext } from "react";
import NoteContaxt from "../context/NoteContext";

export default function Alerts() {
  const constaxt = useContext(NoteContaxt);
  const { alert } = constaxt;
  return (
    alert && (
      <div
        className={`alert alert-${
          alert.type === "Success" ? "success" : "danger"
        }`}
        role="alert"
      >
        <strong>{alert.type}</strong> : {alert.msg}
      </div>
    )
  );
}
