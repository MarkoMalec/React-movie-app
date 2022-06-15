import React from 'react';
import { Container, Center } from '@chakra-ui/react';
import './Header.css';

const Header = () => {
  return (
    <Container maxW="1600px" h="30vh">
      <div className="featured-title">
        <b>
          t<span>re</span>nd<span>i</span>ng
        </b>
        <b>
          {' '}
          <span>m</span>ovies
        </b>
      </div>
    </Container>
  );
};

export default Header;
