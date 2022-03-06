// import React from 'react';
import React, { useEffect } from 'react';

const HostCard = props => {
  const { Name, location, disability, bio, stars } = props.host;
const photo = (props) => {
    return (
        <div className = "photoHolder">
            <img 
            src = {props.profilePhoto.url}
            alt = {props.profilePhoto.host}
            />
        </div>
    )
}
  return(
    <div className="host-card">
         <div className="profile-photo">
         <nav photoTitle = {photo.host} />
         </div>  
        <h2>{Name}</h2>
        <div className="host-location">
          Location: <strong>{location}</strong>
        </div>
        <div className="host-disabilities">
        Acommodations <em>{disability}</em>
        </div>
        <div className="host-bio">
        Host: <em>{bio}</em>
        </div>
        <h3>Rating</h3>
        {stars.map(star => (
          <div key={star} className="host-star">
            {star}
          </div>
        ))}
      </div>
  );
};


// useEffect(() => {
//   const id = props.match.params.id;
//   // change ^^^ that line and grab the id from the URL
//   // You will NEED to add a dependency array to this effect hook

//      axios

//       .get(`https://iwd-2022-team4.herokuapp.com/api/IWD_Homes/<pk:int>/hostData/${id}`)
//       .then(response => {
//         setHost(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });

// }, [props.match.params.id]);
 
export default HostCard;