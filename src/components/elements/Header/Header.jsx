import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

import './Header.scss';

const Header = () => {
  return (
    <Flex as="header" position="fixed" top="0" zIndex='999' w="100%" bg="#141821">
      <Container
        maxW="1400px"
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        pt="2"
        pb="2"
        color='current'
      >
        <Link to={{ pathname: '/'}}>
        <div className="header-title">
          <span>MovieDB</span>
          <p>Made in ReactJS with ChakraUI</p>
        </div>
        </Link>
        <ColorModeSwitcher />
      </Container>
    </Flex>
  );
};

export default Header;
