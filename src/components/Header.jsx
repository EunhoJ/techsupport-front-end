import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"; 

export default function Header() {
  return (
    <header className="bg-sky-950 py-2 font-sans shadow-lg fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <Link to="/" className="flex items-center justify-center text-xl text-white gap-2">
          <img src={Logo} alt="TechSupport Logo" className="w-[50px]" />
          <span className="hover:text-[#E0D449] duration-300 font-bold">
            TechSupport
          </span>
        </Link>
        <div className="flex gap-7 items-center text-white text-lg">
          <Link to="/" className="hover:text-[#E0D449] transition-colors">
            Home
          </Link>
          <a href="/#service" className="hover:text-[#E0D449] transition-colors">
            Serviços
          </a>
          <Link
            to="/login"
            className="bg-amber-50 hover:bg-[#E0D449] font-bold rounded-full px-5 py-1 text-[#203D4E] transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}