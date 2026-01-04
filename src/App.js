import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Profile from "./components/Profile";
import NoteState from "./context/NoteState";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alerts from "./components/Alerts";
function App() {
  return (
    <>
      {" "}
      <HashRouter>
        <NoteState>
          {/* <Router> */}
          <Navbar />
          <Alerts />
          <h1 className="text-center ">iNotebook</h1>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          {/* </Router>{" "} */}
        </NoteState>
      </HashRouter>
    </>
  );
}

export default App;

// app.js
