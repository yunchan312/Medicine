import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh]">
      <div className="py-1 bg-purple-200 grid grid-cols-[1fr_12fr]">
        <div
          className="text-[30px] justify-self-start px-1 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          &larr;
        </div>
        <div className="justify-self-center py-2 cursor-pointer">
          Search Medicine
        </div>
      </div>
      <Outlet />
    </div>
  );
}
