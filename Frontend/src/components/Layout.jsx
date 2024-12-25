import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <main className="flex w-screen h-screen bg-dark-bg bg-slate-100">
      <section className="flex h-full w-fit">
        <Sidebar />
      </section>
      <section className="flex flex-col h-full w-full">
        <Topbar />
        <section className="flex h-full border rounded-[100px] bg-white mr-6 mb-6">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default Layout;
