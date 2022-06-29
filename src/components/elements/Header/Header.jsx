import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

import './Header.scss';

const Header = () => {
  return (
    <Flex as="header" position="fixed" top="0" zIndex='999' w="100%" bg="primary.main">
      <Container
        maxW="1400px"
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        pt="2"
        pb="2"
        color='current'
      >
        <Link to={{ pathname: '/' }}>
        <Box className="header-title">
          <Text color='brand.700' fontSize='s' fontWeight='bold'>MovieDB</Text>
          <Text color='whiteAlpha.700'>Made in ReactJS with ChakraUI</Text>
        </Box>
        </Link>
        <Link to={{ pathname: 'TvHome' }}>
          <Box className='tv-button'><Text>TV Shows</Text></Box>
        </Link>
        <ColorModeSwitcher />
      </Container>
    </Flex>
  );
};

export default Header;
