import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Search, Edit, Trash2 } from "lucide-react"; // Ícones para as ações

export default function ClientesListPage() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o filtro de busca
  const { token } = useAuth();

  // Função para buscar os dados da nossa API
  const fetchClientes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3300/api/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error("Falha ao buscar os dados dos clientes.");
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [token]);

  // Lógica para deletar um cliente
  const handleDelete = async (clienteId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:3300/api/clientes/${clienteId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok && response.status !== 204) {
          throw new Error("Falha ao deletar o cliente.");
        }
        // Remove o cliente da lista no frontend para uma atualização instantânea
        setClientes(clientes.filter((c) => c.id_cliente !== clienteId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Lógica de filtro: só recalcula quando 'clientes' ou 'searchTerm' mudam
  const filteredClientes = useMemo(() => {
    if (!searchTerm) {
      return clientes;
    }
    return clientes.filter(
      (cliente) =>
        cliente.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cpf_cliente.includes(searchTerm)
    );
  }, [clientes, searchTerm]);

  if (isLoading)
    return <p className="text-white text-center">Carregando clientes...</p>;
  if (error) return <p className="text-red-400 text-center">Erro: {error}</p>;

  return (
    <div className="p-8 bg-[#203D4E] rounded-lg shadow-lg w-full text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Clientes Cadastrados</h2>
        <div className="relative w-full md:w-auto">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4"
          />
        </div>
        <Link
          to="/dashboard/cadastro"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto text-center"
        >
          + Novo Cliente
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-left text-sm font-semibold">
              <th className="p-3">Nome</th>
              <th className="p-3">CPF</th>
              <th className="p-3">Contato</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr
                  key={cliente.id_cliente}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="p-3">{cliente.nome_cliente}</td>
                  <td className="p-3">{cliente.cpf_cliente}</td>
                  <td className="p-3">
                    {cliente.tel_celular_cliente || cliente.email_cliente}
                  </td>
                  <td className="p-3 flex justify-center items-center gap-4">
                    <Link
                      to={`/dashboard/clientes/editar/${cliente.id_cliente}`}
                      title="Editar"
                    >
                      <Edit
                        className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                        size={20}
                      />
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente.id_cliente)}
                      title="Excluir"
                    >
                      <Trash2
                        className="text-red-500 hover:text-red-400 cursor-pointer"
                        size={20}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-400">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
