import React, {useState, useEffect} from 'react';
// import {useHistory} from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';
import {tsPropertySignature} from "@babel/types";

const Photo = (props) => {
    return (
        <div className = "photoHolder">
            <img 
            src = {props.photoOfTheDay.url}
            alt = {props.photoOfTheDay.title}
            />
        </div>
    )
}

const Nav = (props) =>  {
    return (
        <nav>
            <p>Connect with User: {props.photoTitle}</p>
        </nav>
    )
}

export default Photo