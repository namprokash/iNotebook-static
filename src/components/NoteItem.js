import React, { useContext } from "react";
import NoteContaxt from "../context/NoteContext";
// import { ReactComponent as Edit } from "./imgs/edit.svg";
// import { ReactComponent as Delete } from "./imgs/delete.svg";

function NoteItem(props) {
  const context = useContext(NoteContaxt);
  const { deleteNote } = context;
  const { note, onEdid } = props;
  return (
    <div className="col-md-4 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title align-center">
            {note.title}
            <span style={{ float: "right", textAlign: "right" }}>
              <button
                type="button"
                className="btn btn-outline-warning mx-2"
                onClick={() => {
                  onEdid(note);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mx-2 "
                onClick={() => {
                  deleteNote(note._id);
                }}
              >
                Delete
              </button>
            </span>
          </h5>

          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
