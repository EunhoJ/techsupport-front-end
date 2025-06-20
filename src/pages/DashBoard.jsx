import { useState } from "react";
import { Outlet, useOutlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // 2. ADICIONE ESTA LINHA DE VOLTA
  const outlet = useOutlet();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Navigation
        isOpen={isSidebarOpen}
        toggle={toggleSidebar}
        user={user}
        handleLogout={handleLogout}
      />
      <main
        className={`
          flex-1 p-4 sm:p-6 md:p-8 
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "ml-44" : "ml-16"}
        `}
      >
  
        {outlet ? (
          outlet
        ) : (
          <div className="p-6 bg-[#203D4E] rounded-lg shadow-lg w-full text-white">
            <h1 className="text-3xl font-bold">Bem-vindo ao seu Dashboard</h1>
            <p className="mt-4 text-gray-300">
              Selecione uma opção no menu à esquerda para começar.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}