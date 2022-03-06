import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import HostCard from './HostCard';

const HostList = props => {
  const [hosts, setHosts] = useState([])
  useEffect(() => {
    const getHosts = () => {
      axios
        .get('https://iwd-2022-team4.herokuapp.com/api/IWD_Homes/hosts/')
        .then(response => {
          setHosts(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getHosts();
  }, []);
  
  return (
    <div className="host-list">
      {hosts.map(host => (
        <HostDetails key={host.id} host={host} />
      ))}
    </div>
  );
}

function HostDetails({ host }) {
  return (
    <Link to={`/host/${host.id}`}> 
      <HostCard host={host}/>
    </Link>
  );
}

export default HostList;
