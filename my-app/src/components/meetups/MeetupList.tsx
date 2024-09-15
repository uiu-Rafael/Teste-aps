/* eslint-disable @typescript-eslint/no-empty-function */
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

export interface Meetup {
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

export interface MeetupListProps {
  meetups: Meetup[];
  onDeleteMeetup?: (id: string) => void; // já opcional
  onUpdateMeetup?: (updatedMeetup: Meetup) => void; // Torna opcional usando '?'
}

function MeetupList({
  meetups,
  onDeleteMeetup,
  onUpdateMeetup,
}: MeetupListProps) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          name={meetup.name}
          fantasyname={meetup.fantasyname}
          bairro={meetup.bairro}
          cnpj={meetup.cnpj}
          cep={meetup.cep}
          logradouro={meetup.logradouro}
          city={meetup.city}
          email={meetup.email}
          phone={meetup.phone}
          complement={meetup.complement}
          onDelete={onDeleteMeetup || (() => {})}
          onUpdate={onUpdateMeetup} // Passa a função para MeetupItem
        />
      ))}
    </ul>
  );
}

export default MeetupList;
