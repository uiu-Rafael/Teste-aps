import React from 'react';
import { useNavigate } from 'react-router-dom'; // Corrigido o import
import NewMeetForm from '../components/meetups/NewMeetupForm';

// Definição do tipo para os dados do meetup
interface MeetupData {
  cnpj: string;
  image: string;
  name: string;
  fantasyname: string;
  cep: string;
  logradouro: string;
  bairro: string;
  city: string;
  email: string;
  phone: string;
  complement: string;
}

const NewMeetupPage: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação programática

  // Função para lidar com o envio do formulário
  const onAddMeetupHandler = (meetupData: MeetupData) => {
    fetch('http://localhost:8080/clients', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      navigate('/'); // Redireciona programaticamente para a página inicial
    });
  };

  return (
    <section>
      <h1>Nova Reunião</h1>
      <NewMeetForm onAddMeetup={onAddMeetupHandler} />
    </section>
  );
};

export default NewMeetupPage;
