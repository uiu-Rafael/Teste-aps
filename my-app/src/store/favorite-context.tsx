/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode } from 'react';

// Definição dos tipos
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
  addFavorite: (favoriteMeetup: Meetup) => void;
  removeFavorite: (meetupId: string) => void;
  itemIsFavorite: (meetupId: string) => boolean;
}

// Valor padrão do contexto
const defaultContext: FavoritesContextType = {
  favorites: [],
  totalFavorites: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  itemIsFavorite: () => false,
};

const FavoritesContext = createContext<FavoritesContextType>(defaultContext);

interface FavoritesContextProviderProps {
  children: ReactNode;
}

export function FavoritesContextProvider({
  children,
}: FavoritesContextProviderProps) {
  const [userFavorites, setUserFavorites] = useState<Meetup[]>([]);

  function addFavoriteHandler(favoriteMeetup: Meetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  function removeFavoriteHandler(meetupId: string) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId: string): boolean {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context: FavoritesContextType = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
