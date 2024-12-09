// import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import { ReactTyped } from "react-typed";
import "./style.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-5xl  mt-5 text-center font-extrabold text-violet-700">
          <ReactTyped
            strings={[`Todo App with Redux`]}
            typeSpeed={80}
            backSpeed={60}
            backDelay={2500}
            showCursor={true}
            loop={false}
          />
        </h1>

        <Todo />
      </div>
    </>
  );
}

export default App;
