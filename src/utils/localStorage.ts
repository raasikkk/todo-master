// // utils/localStorage.ts

// export const loadStateFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("todos");
//     if (serializedState) {
//       return JSON.parse(serializedState);
//     }
//     return undefined; // If nothing in localStorage, return undefined (use initialState)
//   } catch (error) {
//     console.error("Could not load state from localStorage", error);
//     return undefined;
//   }
// };

// export const saveStateToLocalStorage = (state: any) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("todos", serializedState);
//   } catch (error) {
//     console.error("Could not save state to localStorage", error);
//   }
// };
