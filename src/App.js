import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routers/Home";
import Layout from "./components/Layout";
import Result from "./routers/Result";
import Search from "./routers/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/result/:filter",
          element: <Result />,
        },
      ],
    },
  ]);
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center">
      <div className="w-[500px]">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
