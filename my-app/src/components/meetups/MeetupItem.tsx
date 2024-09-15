import { useContext, useState } from 'react';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorite-context';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  styled,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import NewMeetForm from './NewMeetupForm';
import { useNavigate } from 'react-router-dom';
import { Meetup, MeetupListProps } from './MeetupList';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'transparent',
  p: 4,
  height: '100%',
};

interface MeetupItemProps {
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
  onDelete: (id: string) => void; // Nova prop para deletar
  onUpdate?: (meetup: Meetup) => void; // Ajuste: Esperar Meetup ao invés de MeetupListProps
}

function MeetupItem(props: MeetupItemProps) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        cnpj: props.cnpj,
        image: props.image,
        name: props.name,
        fantasyname: props.fantasyname,
        cep: props.cep,
        logradouro: props.logradouro,
        bairro: props.bairro,
        city: props.city,
        email: props.email,
        phone: props.phone,
        complement: props.complement,
      });
    }
  }

  async function deleteMeetupHandler() {
    try {
      await fetch(`http://localhost:8080/clients/${props.id}`, {
        method: 'DELETE',
      });

      if (itemIsFavorite) {
        favoritesCtx.removeFavorite(props.id);
      }

      // Verifica se onDelete existe antes de chamar
      if (props.onDelete) {
        props.onDelete(props.id);
      }
    } catch (error) {
      console.error('Erro ao deletar o meetup:', error);
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  async function onEditMeetupHandler(meetupData: MeetupData) {
    try {
      const response = await fetch(
        `http://localhost:8080/clients/${props.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(meetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok && props.onUpdate) {
        const updatedMeetup: Meetup = { ...meetupData, id: props.id }; // Garante que updatedMeetup é do tipo Meetup
        props.onUpdate(updatedMeetup); // Chama a função para atualizar o estado na página principal
      }

      handleClose();
    } catch (error) {
      console.error('Erro ao editar o meetup:', error);
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.direction}>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteForeverIcon sx={{ color: red[500] }} />}
            onClick={deleteMeetupHandler}
          >
            Deletar
          </Button>
          <div>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<EditNoteIcon sx={{ color: blue[600] }} />}
              onClick={handleOpen}
            >
              Editar
            </Button>
            <Modal
              sx={{
                overflowY: 'scroll',
                display: 'flex',
              }}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <NewMeetForm onAddMeetup={onEditMeetupHandler} />
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <address>
            {props.fantasyname}, {props.bairro}, {props.city}.
          </address>
          <p>Email: {props.email}</p>
          <p>Logradouro: {props.logradouro}</p>
          <p>Telefone: {props.phone}</p>
          <p>CNPJ: {props.cnpj}</p>
          <p>Complemento: {props.complement}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite
              ? 'Remover dos Favoritos'
              : 'Adicionar aos Favoritos'}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
