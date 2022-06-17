import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme
} from '@chakra-ui/react';
import theme from '../../theme';
import { AnimatePresence } from 'framer-motion';
import { Logo } from '../../Logo';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import BrowseByActor from '../BrowseByActor/BrowseByActor';
import BrowseByDirector from '../BrowseByDirector/BrowseByDirector';
import BrowseByWriter from '../BrowseByWriter/BrowseByWriter';
import BrowseByGenre from '../BrowseByGenre/BrowseByGenre';
import BrowseByYear from '../BrowseByYear/BrowseByYear';
import NotFound from '../elements/NotFound/NotFound';
import AppFooter from '../elements/AppFooter/AppFooter';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
      <Router basename=''>
        <Header />
        <Switch>
        <Route path="/movie/:movieId" element={<Movie />} exact />
          <Route path="/actor/:actorId" element={<BrowseByActor />} exact />
          <Route path="/director/:directorId" element={<BrowseByDirector />} exact />
          <Route path="/writer/:writerId" element={<BrowseByWriter />} exact />
          <Route path="/genre/:genreId" element={<BrowseByGenre />} exact />
          <Route path="/year/:yearId" element={<BrowseByYear />} exact />
          <Route path="/" element={<Home />} exact />
          <Route element={<NotFound />} />
        </Switch>
      </Router>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
