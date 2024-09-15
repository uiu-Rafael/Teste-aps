/* eslint-disable @typescript-eslint/no-empty-function */
// FavoritesPage.tsx
import React, { useContext } from 'react';
import FavoritesContext from '../store/favorite-context';
import MeetupList from '../components/meetups/MeetupList';

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

interface FavoritesContextType {
  favorites: Meetup[];
  totalFavorites: number;
}

const FavoritesPage: React.FC = () => {
  const favoritesCtx = useContext(FavoritesContext) as FavoritesContextType;

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>Você ainda não tem favoritos. Vamos começar a adicionar alguns?&#128513;</p>;
  } else {
    content = (
      <MeetupList
        meetups={favoritesCtx.favorites}
        onDeleteMeetup={() => {}} // Função vazia para atender ao requisito
      />
    );
  }

  return (
    <section>
      <h1>Meus Favoritos</h1>
      {content}
    </section>
  );
};

export default FavoritesPage;
