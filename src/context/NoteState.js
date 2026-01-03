import React, { useState } from "react";
import NoteContaxt from "./NoteContext";

export default function NoteState(props) {
  const host = "https://inotebook-server-aqfi.onrender.com";
  // const host = "http://localhost:5000";
  const token = localStorage.getItem("token");

  // showing alerts===========================================
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  //  getting Notes ===========================================

  const [notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    // Calling api
    try {
      const res = await fetch(`${host}/api/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Error!");
        return;
      }

      const json = await res.json();
      setNotes(json.payload);
    } catch (error) {
      console.log("error!");
    }
  };

  // Add note ===================================================

  const addNewNote = async ({ title, description, tag }) => {
    const note = {
      title,
      description,
      tag,
    };
    // Calling api
    const res = await fetch(`${host}/api/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    console.log(await res.json());
    // Client side =========

    console.log("Added new");
    setNotes(notes.concat(note));
  };
  // edit notes ===========================================================
  const editNote = async (edNote) => {
    const { id, title, description, tag } = edNote;

    // client side update =============
    let edNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = edNotes[index];
      if (element._id === id) {
        edNotes[index].title = title;
        edNotes[index].description = description;
        edNotes[index].tag = tag;
        break;
      }
    }
    setNotes(edNotes);

    // Calling api =======================
    const res = await fetch(`${host}/api/note/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(edNote),
    });
    let modal = window.bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();
    console.log(res);
    showAlert("Note updated successfully!", "Success");
  };

  //================= Delete notes =============================================

  const deleteNote = async (id) => {
    const isConfirm = window.confirm("Are you sure?");

    if (isConfirm) {
      // server ===============
      const res = await fetch(`${host}/api/note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // or credentials: include
        },
      });
      console.log(await res.json());

      // client =============
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      showAlert("Note Deleted successfully!", "Delete");
    }
  };

  //  showing prifile ===========================================
  const [self, setSelf] = useState([]);
  const profile = async () => {
    // Calling api
    try {
      const res = await fetch(`${host}/api/logedin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Error!");
        return;
      }

      const json = await res.json();
      console.log(json);
      setSelf(json);
    } catch (error) {
      console.log("error!");
    }
  };

  return (
    <NoteContaxt.Provider
      value={{
        notes,
        setNotes,
        addNewNote,
        editNote,
        deleteNote,
        getAllNotes,
        alert,
        showAlert,
        profile,
        self,
      }}
    >
      {props.children}
    </NoteContaxt.Provider>
  );
}
