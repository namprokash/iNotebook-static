import React, { useContext } from "react";
import NoteContaxt from "../context/NoteContext";

function About() {
  const cntx = useContext(NoteContaxt);
  return <div>About {cntx.course}</div>;
}

export default About;
