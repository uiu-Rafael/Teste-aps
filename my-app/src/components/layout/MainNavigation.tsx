import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { cloneElement, useContext } from 'react';
import FavoritesContext from '../../store/favorite-context';
import { AppBar, Slide, Toolbar, useScrollTrigger } from '@mui/material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<any>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

const MainNavigation: React.FC = () => {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <ElevationScroll>
        <AppBar>
          <Toolbar className={classes.header}>
            <div className={classes.logo}>React Meetups</div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Reuniões</Link>
                </li>
                <li>
                  <Link to="/new-meetup">Adicionar Nova Reunião</Link>
                </li>
                <li>
                  <Link to="/favorites">Meus Favoritos</Link>
                  <span className={classes.badge}>
                    {favoritesCtx.totalFavorites}
                  </span>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </header>
  );
};

export default MainNavigation;
