import React, { useContext, useEffect, useState } from "react";
import NoteContaxt from "../context/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes() {
  const constaxt = useContext(NoteContaxt);
  const { notes, getAllNotes, editNote } = constaxt;
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [edNote, setEdNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const openEditModal = (currentNote) => {
    setEdNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });

    let modal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
    modal.show();
  };

  return (
    <>
      <AddNote />
      <h1>Notes</h1>
      <div className="container row">
        {notes.map((note) => {
          return (
            <NoteItem note={note} onEdid={openEditModal} key={Math.random()} />
          );
        })}
      </div>

      {/* // modal bootstrap -------------------------------------- */}
      <div
        className="modal"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={edNote.title}
                  onChange={(e) =>
                    setEdNote({ ...edNote, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={edNote.description}
                  onChange={(e) =>
                    setEdNote({ ...edNote, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  value={edNote.tag}
                  onChange={(e) =>
                    setEdNote({ ...edNote, tag: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => editNote(edNote)}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
