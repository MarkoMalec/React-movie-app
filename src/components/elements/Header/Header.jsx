import { React } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
          to={{
            pathname: `${
              location.pathname.includes('tv') ||
              location.pathname.includes('Tv')
                ? '/TvHome'
                : '/'
            }`,
          }}
        >
          <Box className="header-title">
            <Text color="brand.700" fontSize="s" fontWeight="bold">
              MovieDB
            </Text>
            <Text color="whiteAlpha.700">Made in ReactJS</Text>
          </Box>
        </Link>
        <ul className="header-navigation">
          <NavLink
            activeclassname="active"
            className={location.pathname.includes('movie') ? 'active' : ''}
            to={{ pathname: '/' }}
          >
            Movies
          </NavLink>
          <NavLink
            activeclassname="active"
            className={
              location.pathname.includes('tv') ||
              location.pathname.includes('Tv')
                ? 'active'
                : ''
            }
            to={{ pathname: 'TvHome' }}
          >
            TV Shows
          </NavLink>
          <NavLink activeclassname="active" to={{ pathname: 'watchlist' }}>
            Watchlist
          </NavLink>
          <a className="hslide"></a>
        </ul>
      </Container>
    </Flex>
  );
};

export default Header;
