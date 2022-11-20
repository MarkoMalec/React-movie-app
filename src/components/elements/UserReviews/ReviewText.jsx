import React, { useState } from 'react';

const ReviewText = ({ text, length = 350 }) => {
    const [showLess, setShowLess] = useState(true);
    if (text.length < length) {
      return <p>{text}</p>;
    }
  
    return (
      <>
      <div className={!showLess ? 'text_excerpt' : 'text_excerpt text_excerpt_overlay'}>
        <p className='review-text'>{showLess ? `${text.slice(0, length)}...` : text}</p>
      </div>
        <span
          className={!showLess ? 'read_less_excerpt' : 'read_more_excerpt'}
          style={{ color: 'tomato', cursor: 'pointer' }}
          onClick={() => setShowLess(!showLess)}
        >
          &nbsp;Read {showLess ? 'More' : 'Less'}
        </span>
        </>
    );
  };

  export default ReviewText;