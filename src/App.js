import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routers/Home";
import Layout from "./components/Layout";
import Result from "./routers/Result";
import Search from "./routers/Search";
import Detail from "./routers/Detail";
import Test from "./Test";

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
        {
          path: "/detail/:id",
          element: <Detail />,
        },
      ],
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center">
      <div className="w-[500px] border-2 border-black overflow-y-scroll no-scrollbar">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
