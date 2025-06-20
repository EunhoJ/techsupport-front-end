import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-bold text-[#152934]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[#152934] sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-[16px] bg-[#152934] px-3.5 py-2.5 text-sm font-semibold text-[#E0D449] shadow-2xl/30 hover:brightness-120 duration-400"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
