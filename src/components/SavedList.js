import React from 'react';
// import {Link} from 'react-router-dom';
import {Link, NavLink} from 'react-router-dom';


const SavedList = props => (
  <div className="saved-list">
    <h3>Connections</h3>
    {props.list.map(host => (
      <NavLink to={`/hosts/${host.id}`}>
        <span className="saved-host">{host.hostName}</span>
      </NavLink>
    ))}
    {/* <Link to='/'> */}
      <div className="home-button" onClick={() => props.history.push('/')}>Home</div>
    {/* </Link> */}
  </div>
);

export default SavedList;
