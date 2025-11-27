import React, { useState } from "react";
import NoteContaxt from "./NoteContext";

export default function NoteState(props) {
  const host = "http://localhost:5000";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MTU2OTE5NWM1MzYyYzcwYTgzZTNmMSIsIm5hbWUiOiJIYXJyeTYiLCJlbWFpbCI6Im9uYW1wcjZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTUkNG5kU3d0NWVDdmdkdTFqLm1SOEg5T3Z1RWU3cHJJZnBxdVNKVDZrdHlsbXFmQUNJVzloLjIiLCJjcmVhdGVkQXQiOiIyMDI1LTExLTEzVDA1OjE0OjAxLjM3NFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTExLTEzVDA1OjE0OjAxLjM3NFoiLCJfX3YiOjB9LCJpYXQiOjE3NjQxMzI0ODJ9.T8UJ3nBmNF1P_vgQBiWufKKl1z3vdFRIoQR-8I5P3fg";
  // const notesInit = [];
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
      setNotes(
        notes.concat({
          title: "Note not Found!",
          description: "Api is not working.",
          tag: "",
        })
      );
    }
  };

  // Add note ================
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
  // edit notes ==================
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
  };

  //================= delete notes ==================

  const deleteNote = async (id) => {
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
    console.log(newNotes);
  };
  return (
    <NoteContaxt.Provider
      value={{ notes, setNotes, addNewNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContaxt.Provider>
  );
}
