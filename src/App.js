import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Profile from "./components/Profile";
import NoteState from "./context/NoteState";
import Home from "./components/Home";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <h1 className="text-center ">iNotebook</h1>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

// app.js
