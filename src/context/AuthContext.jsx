
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  const fetchUser = useCallback(
    async (currentToken) => {
      if (!currentToken) {
        setUser(null);
        return;
      }
      try {
        const response = await fetch("http://localhost:3300/api/users/me", {
          headers: { Authorization: `Bearer ${currentToken}` },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error("Token inválido ou expirado");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário, fazendo logout:", error);
        logout(); // Chama a função de logout já definida
      }
    },
    [logout]
  ); // Adiciona logout como dependência

  useEffect(() => {
    fetchUser(token);
  }, [token, fetchUser]);

  const login = async (usuario, senha) => {
    try {
      const response = await fetch("http://localhost:3300/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro no login");

      setToken(data.token);
      return { success: true };
    } catch (error) {
      console.error("Falha no login:", error);
      return { success: false, message: error.message };
    }
  };

  const authContextValue = { token, user, login, logout, fetchUser };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Lembre-se que o aviso sobre "Fast refresh" pode ser ignorado com segurança.
export const useAuth = () => {
  return useContext(AuthContext);
};
