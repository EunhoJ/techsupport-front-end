// src/components/Navigation.jsx (VERSÃO CORRIGIDA)

import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
// A importação agora inclui 'List'
import {
  Home,
  UserPlus,
  Briefcase,
  FileText,
  MessageCircle,
  BarChart2,
  DollarSign,
  ShieldCheck,
  Menu,
  LogOut,
  User,
  List,
} from "lucide-react";

const menuItems = [
  { icon: <Home size={20} />, label: "Painel", path: "/dashboard" },
  {
    icon: <UserPlus size={20} />,
    label: "Cadastro",
    path: "/dashboard/cadastro",
  },
  { icon: <List size={20} />, label: "Clientes", path: "/dashboard/clientes" },
  { icon: <User size={20} />, label: "Meu Perfil", path: "/dashboard/perfil" },
];

export default function Navigation({ isOpen, toggle, user, handleLogout }) {
  const location = useLocation();

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-[#203D4E] text-[#F2F4F4] 
        flex flex-col z-[1000] rounded-r-lg overflow-hidden
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-44" : "w-16"} 
      `}
    >
      <div
        className="h-[60px] flex justify-center items-center cursor-pointer"
        onClick={toggle}
      >
        <Menu size={28} color="#F2F4F4" />
      </div>

      <div className="p-4 text-center border-b border-t border-gray-700">
        {isOpen ? (
          <div>
            <h3 className="font-bold text-white truncate" title={user?.usuario}>
              {user?.usuario || "Usuário"}
            </h3>
            <p className="text-xs text-gray-400 mb-2">{user?.nivelAcesso}</p>
            <button
              onClick={handleLogout}
              className="w-full text-xs bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-colors"
            >
              Sair
            </button>
          </div>
        ) : (
          <LogOut
            size={24}
            className="mx-auto cursor-pointer hover:text-red-500 transition-colors"
            onClick={handleLogout}
            title="Sair"
          />
        )}
      </div>

      <nav className="flex-1 flex flex-col items-start pt-2">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`
              flex items-center justify-start gap-2 p-2.5 cursor-pointer 
              transition-colors duration-200 w-full hover:text-[#E0D449] ml-4
              ${
                location.pathname === item.path
                  ? "border-l-4 border-[#E0D449] text-[#f2f4f4]"
                  : "border-l-4 border-transparent"
              }
            `}
          >
            {item.icon}
            {isOpen && (
              <span className="whitespace-normal break-words overflow-wrap-break-word ml-1">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto text-[#E0D449]">
        <img
          src={Logo}
          alt="Logo Footer"
          className="w-[60px] h-auto block mx-auto"
        />
      </div>
    </div>
  );
}
