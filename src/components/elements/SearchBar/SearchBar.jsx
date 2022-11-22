import React from 'react';
import { useState } from 'react';
import { Container, Flex, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';

const SearchBar = ({ callback, placeholder }) => {
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);
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

  const expandSearch = e => {
    if(!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }

  return (
    <div className="search-section">
      <div className={expanded ? 'input-part active' : 'input-part'}>
        {/* <Container> */}
        <Flex>
          <Input
            type="text"
            placeholder={placeholder}
            size="sm"
            focusBorderColor="brand.700"
            onChange={doSearch}
            value={value}
          />
          {/* <ColorModeSwitcher /> */}
        </Flex>
        {/* </Container> */}
      </div>
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.6em', color: 'tomato'}} onClick={expandSearch}/>
    </div>
  );
};

export default SearchBar;
