import React from 'react';
import { useState } from 'react';
import { Container, Input } from '@chakra-ui/react';
import './SearchBar.css';

const SearchBar = ({ callback }) => {
  const [value, setValue] = useState('');
  var timeout = null;

  const doSearch = e => {
    setValue(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(e.target.value);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <>
      <Container maxW="1400px">
        <Input
          type="text"
          placeholder="Search for a movie"
          size="sm"
          focusBorderColor="tomato"
          onChange={doSearch}
          value={value}
        />
      </Container>
    </>
  );
};

export default SearchBar;
