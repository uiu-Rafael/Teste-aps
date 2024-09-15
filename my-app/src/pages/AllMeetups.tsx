import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

// Definição do tipo para os meetups
interface Meetup {
  id: string;
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

const AllMeetupsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState<Meetup[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/clients') // URL para pegar todos os clientes
      .then((response) => response.json())
      .then((data) => {
        setLoadedMeetups(data);
        setIsLoading(false);
      });
  }, []);

  // Função para remover meetup do estado local
  const handleDeleteMeetup = (id: string) => {
    setLoadedMeetups((prevMeetups) =>
      prevMeetups.filter((meetup) => meetup.id !== id),
    );
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  // Função para atualizar meetup no estado local
  const handleUpdateMeetup = (updatedMeetup: Meetup) => {
    setLoadedMeetups((prevMeetups) =>
      prevMeetups.map((meetup) =>
        meetup.id === updatedMeetup.id ? updatedMeetup : meetup,
      ),
    );
  };

  return (
    <section>
      <h1>Reuniões</h1>
      <MeetupList
        meetups={loadedMeetups}
        onDeleteMeetup={handleDeleteMeetup}
        onUpdateMeetup={handleUpdateMeetup}
      />
    </section>
  );
};

export default AllMeetupsPage;
