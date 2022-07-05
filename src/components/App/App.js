import React from 'react';
import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import TvHome from '../TvHome/TvHome';
import Movie from '../Movie/Movie';
import Show from '../Show/Show';
import Season from '../elements/Season/Season';
import BrowseByActor from '../BrowseByActor/BrowseByActor';
import BrowseByDirector from '../BrowseByDirector/BrowseByDirector';
import BrowseByWriter from '../BrowseByWriter/BrowseByWriter';
import BrowseByGenre from '../BrowseByGenre/BrowseByGenre';
import BrowseByYear from '../BrowseByYear/BrowseByYear';
import NotFound from '../elements/NotFound/NotFound';
import AppFooter from '../elements/AppFooter/AppFooter';
import './App.scss';
import '../../styles/global/globals.scss';

function App() {
  const theme = extendTheme({
    colors: {
      brand: {
        100: '#ff8162',
        200: '#ff7759',
        300: '#ff6d50',
        main: '#ff6347',
        500: '#f3593e',
        600: '#e84f36',
        700: '#dc442d'
      },
      primary: {
        100: '#313b51',
        200: '#272f41',
        300: '#1e2431',
        main: '#141821',
        500: '#0a0c11',
        600: '#010101'
      }
    },
    components: {
      Container: {
        baseStyle: {
          maxWidth: '1400px'
        }
      }
    },
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    }
  })
  return (
    
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        <Router basename="">
          <Header />
          <Switch>
            <Route path="/movie/:movieId" element={<Movie />} exact />
            <Route path="/tv/:showId" element={<Show />} exact />
            <Route path="/tv/:showId/season/:seasonId" element={<Season />} exact />
            <Route path="/actor/:actorId" element={<BrowseByActor />} exact />
            <Route
              path="/director/:directorId"
              element={<BrowseByDirector />}
              exact
            />
            <Route
              path="/writer/:writerId"
              element={<BrowseByWriter />}
              exact
            />
            <Route path="/genre/:genreId" element={<BrowseByGenre />} exact />
            <Route path="/year/:yearId" element={<BrowseByYear />} exact />
            <Route path="/" element={<Home />} exact />
            <Route path= "/:shows" element={<TvHome />} exact />
            <Route element={<NotFound />} />
          </Switch>
          <AppFooter />
        </Router>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
