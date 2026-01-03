import React, { useContext, useEffect } from "react";
import NoteContaxt from "../context/NoteContext";

function Profile() {
  const context = useContext(NoteContaxt);
  const { self, profile } = context;

  useEffect(() => {
    profile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const date = self.createdAt;
  const formated = date?.slice(0, 10).split("-").reverse().join("-");
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {" "}
            <span className="fw-bold">Name</span> : {self.name}
          </h5>
          <p className="card-text">
            {" "}
            <span className="fw-bold">Email</span> : {self.email}
          </p>
          <h6 className="card-subtitle mb-2">
            Profile created on : <span className="text-muted">{formated}</span>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Profile;
