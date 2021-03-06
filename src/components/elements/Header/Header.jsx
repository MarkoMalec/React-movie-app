import { React } from 'react';
import { Link } from 'react-router-dom';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const location = useLocation();
  
  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      zIndex="950"
      w="100%"
      bg="primary.main"
      style={{ boxShadow: '1px 1px 20px #000' }}
    >
      <Container
        maxW="1400px"
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        pt="2"
        pb="2"
        color="current"
      >
        <Link
          to={{ pathname: `${location.pathname === '/TvHome' ? '/TvHome' : '/'}` }}
        >
          <Box className="header-title">
            <Text color="brand.700" fontSize="s" fontWeight="bold">
              MovieDB
            </Text>
            <Text color="whiteAlpha.700">Made in ReactJS</Text>
          </Box>
        </Link>
        <ul className="header-navigation">
          <li>
            <Link to={{ pathname: '/' }}>Movies</Link>
          </li>
          <li>
            <Link to={{ pathname: 'TvHome' }}>TV Shows</Link>
          </li>
        </ul>
      </Container>
    </Flex>
  );
};

export default Header;
