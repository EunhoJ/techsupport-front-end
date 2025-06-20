import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IMaskInput } from "react-imask";

export default function EditarClientePage() {
  const { id } = useParams(); // 1. Pega o ID da URL, ex: "1", "2", etc.
  const navigate = useNavigate(); // Hook para redirecionar o usuário
  const { token } = useAuth();

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Começa true para mostrar "carregando"

  // 2. useEffect para buscar os dados do cliente assim que a página carrega
  useEffect(() => {
    // Só roda se tivermos o ID e o token
    if (id && token) {
      const fetchCliente = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3300/api/clientes/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            throw new Error("Cliente não encontrado ou falha ao buscar dados.");
          }
          const data = await response.json();

          // Formata a data para o formato AAAA-MM-DD que o input type="date" entende
          if (data.data_nasc_cliente) {
            data.data_nasc_cliente = new Date(data.data_nasc_cliente)
              .toISOString()
              .split("T")[0];
          }

          setFormData(data); // Preenche o formulário com os dados do cliente
        } catch (error) {
          setMessage(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCliente();
    }
  }, [id, token]); // Roda de novo se o ID ou o token mudarem

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Função para ENVIAR as alterações para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3300/api/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Cliente atualizado com sucesso!");
      // Após 1.5 segundos, redireciona o usuário de volta para a lista de clientes
      setTimeout(() => navigate("/dashboard/clientes"), 1500);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.id_cliente) {
    return (
      <p className="text-white text-center">Carregando dados do cliente...</p>
    );
  }

  return (
    <div className="p-8 bg-[#203D4E] rounded-lg shadow-lg w-full text-white">
      <h2 className="text-2xl font-bold mb-6">
        Editando Cliente: {formData.nome_cliente}
      </h2>
      {/* O formulário aqui é praticamente idêntico ao de cadastro */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cole aqui os <fieldset> do seu formulário de cadastro (CadastroClientePage.jsx) */}
        {/* Eles funcionarão perfeitamente pois usam os mesmos nomes de campo */}
        <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* ... Todos os seus inputs ... */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              Nome Completo*
            </label>
            <input
              type="text"
              name="nome_cliente"
              value={formData.nome_cliente || ""}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          {/* ...etc... */}
        </fieldset>

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/clientes")}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2.5 rounded-lg font-semibold"
          >
            Cancelar
          </button>
          {message && (
            <p
              className={`text-sm ${
                message.includes("sucesso") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 px-8 py-2.5 rounded-lg disabled:bg-gray-500 font-semibold"
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
