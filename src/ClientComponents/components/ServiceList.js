
import React, {useState, useEffect} from 'react';
import { useContext } from 'react'
import { ServiceListContext } from '../contexts/ServiceListContext'
import '../components/ServiceList.css'


export const ServiceList = () => {

    const { services } = useContext(ServiceListContext)

    // Add services
    return (
        <div>
        <h2 id="header">Current List of Services</h2>
        {services.map(elem => {
            return (<div id={elem.id}> {elem.name} | {elem.duration} | {elem.date} | {elem.intensity} | {elem.location} | {elem.maxServiceSize} | {elem.numberOfRegisteredAttendees} | {elem.type} </div> )
        })}    
        </div>
  
    )
}