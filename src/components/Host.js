import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HostCard from './HostCard';

const Host = (props) => {
  const [host, setHost] = useState();
 
  useEffect(() => {
    const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        // .get(`http://localhost:5000/api/hosts/${id}`)
        .get(`https://iwd-2022-team4.herokuapp.com/api/IWD_Homes/hosts/${id}`)
        .then(response => {
          setHost(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  }, [props.match.params.id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveHost = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(host)
  }

  if (!host) {
    return <div>Connecting you with host and services...</div>;
  }

  return (
    <div className="save-wrapper">
      <HostCard host={host}/>
      <div className="save-button" onClick={saveHost}>Connect</div>
    </div>
  );
}

export default Host;