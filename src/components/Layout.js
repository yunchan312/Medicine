import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-[100vh]">
      <div className="py-3 text-center bg-purple-200">Search Medicine</div>
      <Outlet />
    </div>
  );
}
