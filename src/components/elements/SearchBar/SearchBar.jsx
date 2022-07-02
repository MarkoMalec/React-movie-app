import React from 'react';
import { useState } from 'react';
import { Container, Flex, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import './SearchBar.scss';

const SearchBar = ({ callback, placeholder }) => {
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
    }, 500);
  };

  return (
    <div className='search-section'>
      <Container>
        <Flex>
        <Input
          type="text"
          placeholder={placeholder}
          size="sm"
          focusBorderColor="brand.700"
          onChange={doSearch}
          value={value}
        />
        <ColorModeSwitcher />
        </Flex>
      </Container>
    </div>
  );
};

export default SearchBar;
