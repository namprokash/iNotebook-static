import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Only navigate if 'someCondition' is true
    // This runs after render and avoids the render loop
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Notes />
    </div>
  );
}

export default Home;
