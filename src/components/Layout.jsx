import { Outlet } from "react-router";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div className="flex min-h-screen text-white">
      <Navigation />
      <main className="flex-1 p-8 ml-16">
        <Outlet />
      </main>
    </div>
  );
}