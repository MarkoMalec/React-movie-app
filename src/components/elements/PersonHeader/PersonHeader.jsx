import React, { useState } from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import './PersonHeader.scss';

const PersonHeader = ({
  name,
  profile_path,
  gender,
  biography,
  birthday,
  place_of_birth,
  deathday,
  homepage
}) => {
  return (
    <div className="person-header">
      <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`} />
      <div className="person-header-info">
        <div className='person-header-info-name'>
          <h3>{name}</h3>
          {''}
          <span>{deathday ? birthday + ' - ' + deathday : birthday}</span>
        </div>
        <h4>Place of birth</h4> 
            <p>{place_of_birth}</p>
        <div className='person-header-info-biography'>
            <h4>biography</h4>
            <p>{biography ? biography : "No biography available for this actor."}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonHeader;
