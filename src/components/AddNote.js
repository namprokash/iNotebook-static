import React, { useContext, useState } from "react";
import NoteContaxt from "../context/NoteContext";

function AddNote() {
  const context = useContext(NoteContaxt);
  const { addNewNote, showAlert } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // add notes ==================
  const addNote = (e) => {
    e.preventDefault();
    addNewNote(note);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note has been added successfully!", "Success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Add Notes</h1>
      <form action="" method="POST" onSubmit={addNote}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Note title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            name="title"
            required
            minLength={5}
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            placeholder="Description"
            required
            minLength={8}
            value={note.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Note tag
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNote;
