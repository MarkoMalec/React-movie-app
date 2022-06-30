import React from 'react';

const SeasonInfo = ({ season, seasonName, airDate, overview }) => {
  return(
    <>
    <h1>{seasonName}</h1>
    <p>{overview}</p>
    </>
  );
};

export default SeasonInfo;
