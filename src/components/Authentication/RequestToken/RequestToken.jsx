import { React, useState, useEffect } from 'react';
import { API_KEY } from '../../../fetch';

const NEW_TOKEN = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
const SESSION_URL = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`;

//component to request new token and create session
const RequestToken = () => {
  const [token, setToken] = useState();
  const [session, setSession] = useState();

  useEffect(() => {
    fetch(NEW_TOKEN)
      .then(res => res.json())
      .then(data => {
        setToken(data.request_token);
      });
      
        fetch(SESSION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "request_token": token,
          }),
        })
          .then(res => res.json())
          .then(data => {
            setSession(data.session_id);
            console.log(session)
          });
      
  }, [SESSION_URL, NEW_TOKEN, token]);

  



  if (session) {
    return <p>logged in</p>
  }

  return (
    <div>
      <h1>Request Token</h1>
      <a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/login`}>Login here</a>
      {/* <p>{token}</p> */}
      {/* <button onClick={!session ? createSession : window.location.href=`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/login`}>Create Session</button> */}
      {/* <p>{session}</p> */}
    </div>
  );
};

export default RequestToken;
