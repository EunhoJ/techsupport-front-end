import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Estados para os campos do formulário
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  // Estado para exibir mensagens de erro
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks para usar a função de login e para navegar
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Chama a função de login do nosso AuthContext
      const result = await login(usuario, senha);

      if (result.success) {
        // Se o login deu certo, NAVEGUE para o dashboard!
        navigate("/dashboard");
      } else {
        // Se falhou, mostre a mensagem de erro que veio do backend
        setError(result.message || "Falha ao fazer login.");
      }
    } catch (err) {
      // Pega erros inesperados de conexão, etc.
      console.error("Falha inesperada na tentativa de login:", err);
      setError(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="bg-[#EBEAEA] relative w-full p-4 border-b border-b-gray-200 shadow-sm flex items-center justify-end">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-[#152934]">
          TECHSUPPORT
        </h1>
        <Link
          to="/"
          className="px-4 py-2 border-2 border-[#152934] text-[#152934] font-bold rounded-[16px] hover:bg-[#E0D449] transition-colors duration-300"
        >
          HOME
        </Link>
      </header>
      <main className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-gray-50">
        <div className="flex flex-col items-center gap-6 p-4">
          <h1 className="text-[#152934] text-3xl font-extrabold text-center">
            Acesso ao Sistema
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-[#EBEAEA] border border-gray-300 p-10 rounded-lg flex flex-col gap-4 w-full max-w-md shadow-lg"
          >
            <input
              type="text"
              placeholder="Usuário"
              className="border border-[#152934] p-2 rounded-md"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="border border-[#152934] p-2 rounded-md"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="border-[#152934] border-2 w-[160px] mx-auto font-bold bg-[#152934] text-[#E0D449] hover:brightness-125 transition-all duration-300 rounded-lg py-2 cursor-pointer disabled:bg-gray-500 disabled:border-gray-500"
              disabled={isLoading}
            >
              {isLoading ? "ENTRANDO..." : "INICIAR SESSÃO"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
