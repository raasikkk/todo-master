// import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import "./style.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-5xl mt-5 text-center font-extrabold text-violet-700">
          Todo App with Redux
        </h1>
        <Todo />
      </div>
    </>
  );
}

export default App;
