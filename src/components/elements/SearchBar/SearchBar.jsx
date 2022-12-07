import React, { useEffect, useState, useRef } from 'react';
import { Container, Flex, Input } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';

const SearchBar = ({ callback, placeholder }) => {
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);

  const ref = useRef(null);
  const inputRef = useRef(null);
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

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (expanded && ref.current && ref.current.contains(e.target)) {
        inputRef.current.focus();
      }
      if (expanded && ref.current && !ref.current.contains(e.target)) {
        setExpanded(false)
      }
      if (expanded && inputRef.current && inputRef.current.contains(e.target)) {
        setExpanded(true);
      }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      // Cleanup
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [expanded])

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
            ref={inputRef}
          />
          {/* <ColorModeSwitcher /> */}
        </Flex>
        {/* </Container> */}
      </div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ fontSize: '1.6em', color: 'tomato' }}
        onClick={() => !expanded ? setExpanded(true) : setExpanded(false)}
        ref={ref}
      />
    </div>
  );
};

export default SearchBar;
