import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  decrement,
  // increment,
  incrementByAmount,
  // incrementAsync,
  setToZero,
} from "../state/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2 className="bg-green-300">{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(setToZero())}>Set To Zero</button>
      </div>
    </div>
  );
};

export default Counter;
