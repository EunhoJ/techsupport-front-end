import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { jwtDecode } from 'jwt-decode'; 

export default function PerfilPage() {
  const [formData, setFormData] = useState({ nome: '', usuario: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  // useEffect para buscar os dados do usuário quando a página carregar
  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:3300/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) {
            setFormData({ nome: data.nome || '', usuario: data.usuario || '' });
            setAvatarUrl(data.avatar_url || '');
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [token]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      setMessage('Por favor, selecione uma imagem primeiro.');
      return;
    }

    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      setMessage("Sessão inválida. Por favor, faça login novamente.");
      return;
    }

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    setMessage('Enviando imagem...');
    setIsLoading(true);

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile, { upsert: true });
    if (uploadError) {
      setMessage('Erro ao enviar a imagem.');
      console.error(uploadError);
      setIsLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    const publicURL = publicUrlData.publicUrl;
    setAvatarUrl(publicURL);

    const response = await fetch('http://localhost:3300/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar_url: publicURL }),
    });
    
    const data = await response.json();
    setMessage(data.message || 'Imagem atualizada com sucesso!');
    setIsLoading(false);
  };

  return (
    <div className="p-8 bg-[#203D4E] rounded-lg shadow-lg w-full text-white">
      <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={avatarUrl || `https://ui-avatars.com/api/?name=${formData.nome || '?'}&background=random`} 
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover bg-gray-700"
        />
        <div>
          <label htmlFor="avatarInput" className="block text-sm font-medium text-gray-300 mb-2">Trocar imagem de perfil</label>
          <input id="avatarInput" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          <button onClick={handleAvatarUpload} disabled={isLoading || !avatarFile} className="mt-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">
            {isLoading ? 'Enviando...' : 'Salvar Imagem'}
          </button>
        </div>
      </div>
      
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}