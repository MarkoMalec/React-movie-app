import React, { useState } from 'react';

const ReviewText = ({ text, length = 350 }) => {
    const [showLess, setShowLess] = useState(true);
    if (text.length < length) {
      return <p>{text}</p>;
    }
  
    return (
      <>
        <p>{showLess ? `${text.slice(0, length)}...` : text}</p>
        <span
          style={{ color: 'tomato', cursor: 'pointer' }}
          onClick={() => setShowLess(!showLess)}
        >
          &nbsp;Read {showLess ? 'More' : 'Less'}
        </span>
      </>
    );
  };

  export default ReviewText;