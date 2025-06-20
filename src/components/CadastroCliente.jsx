import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IMaskInput } from 'react-imask';

const initialFormData = {
  nome_cliente: '',
  cpf_cliente: '',
  data_nasc_cliente: '',
  email_cliente: '',
  tel_celular_cliente: '',
  tel_fixo_cliente: '',
  cep: '',
  endereco_cliente: '',
  bairro_cliente: '',
  obs_cliente: '',
};

export default function CadastroClientePage() {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3300/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar cliente.');
      }
      
      setMessage('Cliente cadastrado com sucesso!');
      setFormData(initialFormData); // Limpa o formulário

    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#203D4E] rounded-lg shadow-lg w-full text-white">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Novo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <fieldset className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Nome Completo*</label>
            <input type="text" name="nome_cliente" value={formData.nome_cliente} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">CPF*</label>
            <IMaskInput
              mask="000.000.000-00"
              name="cpf_cliente"
              value={formData.cpf_cliente}
              onAccept={(value) => handleChange({ target: { name: 'cpf_cliente', value } })}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="___.___.___-__"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Data de Nascimento</label>
            <input type="date" name="data_nasc_cliente" value={formData.data_nasc_cliente} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">E-mail</label>
            <input type="email" name="email_cliente" value={formData.email_cliente} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Celular</label>
            <IMaskInput
              mask="(00) 00000-0000"
              name="tel_celular_cliente"
              value={formData.tel_celular_cliente}
              onAccept={(value) => handleChange({ target: { name: 'tel_celular_cliente', value }})}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="(__) _____-____"
            />
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">CEP</label>
            <IMaskInput
              mask="00000-000"
              name="cep"
              value={formData.cep}
              onAccept={(value) => handleChange({ target: { name: 'cep', value }})}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="_____-___"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block mb-1 text-sm font-medium">Endereço (Rua, Nº)</label>
            <input type="text" name="endereco_cliente" value={formData.endereco_cliente} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
          </div>
           <div className="md:col-span-1">
            <label className="block mb-1 text-sm font-medium">Bairro</label>
            <input type="text" name="bairro_cliente" value={formData.bairro_cliente} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
          </div>
        </fieldset>


        <fieldset>
          <label className="block mb-1 text-sm font-medium">Observações</label>
          <textarea name="obs_cliente" value={formData.obs_cliente} onChange={handleChange} rows="3" className="w-full p-2 rounded bg-gray-700 border border-gray-600"></textarea>
        </fieldset>
        
        <div className="flex items-center justify-end gap-4 pt-4">
          {message && <p className={`text-sm ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
          <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 px-8 py-2.5 rounded-lg disabled:bg-gray-500 font-semibold">
            {isLoading ? 'Salvando...' : 'Salvar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
}