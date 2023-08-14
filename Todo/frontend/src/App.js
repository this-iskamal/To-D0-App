import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/todo/home",
      element: <Todo />,
    },
    {
      path:"/forget-password",
      element:<ForgetPassword/>
    }
  ]);
  return (
    <>
    
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
