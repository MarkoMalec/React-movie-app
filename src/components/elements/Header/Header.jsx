import React from 'react';
import { Container, Center, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

import './Header.css';

import './Header.css';

const Header = () => {
  return (
    <Flex as="header" position="fixed" zIndex='999' w="100%" bg="#141821">
      <Container
        maxW="1600px"
        display="flex"
        justifyContent="space-between"
        alignContent="baseline"
        pt="2"
        pb="2"
      >
        <div className="header-title">
          <p>
            <span>MovieDB</span>
          </p>
          <p>Database made with ReactJS</p>
        </div>

        <ColorModeSwitcher />
      </Container>
    </Flex>

    // <Container maxW="1600px" h="30vh">
    //   <div className="featured-title">
    //     <b>
    //       t<span>re</span>nd<span>i</span>ng
    //     </b>
    //     <b>
    //       {' '}
    //       <span>m</span>ovies
    //     </b>
    //   </div>
    // </Container>
  );
};

export default Header;
