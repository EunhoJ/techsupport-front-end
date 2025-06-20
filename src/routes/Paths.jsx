import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/DashBoard";
import PerfilPage from "../pages/PerfilPage";
import CadastroCliente from "../components/CadastroCliente";
import ClientesListPage from "../pages/ClientesListPage";
import EditarClientePage from '../pages/EditarClientePage';

export default function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="cadastro" element={<CadastroCliente />} />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="clientes" element={<ClientesListPage />} />
        <Route path="clientes/editar/:id" element={<EditarClientePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
