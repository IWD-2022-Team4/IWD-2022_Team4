import React, {useState, useEffect} from 'react';
import axios from  'axios';

import { ServiceListContext } from './contexts/ServiceListContext';
import { ServiceList } from './components/ServiceList';
import { axiosWithAuth } from '../util/axiosWithAuth';

import './components/ServiceList.css'

// Lots of help for setting up search from this guide: https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg

const initialState = [{"id":1,"name":"Cycling","type":"Cardio","date":"Wednesday","duration":"1 hour","intensity":"Difficult","location":"54526 Crooks Vista","numberOfRegisteredAttendees":"99500","maxServiceSize":51345}]

export const ClientPage = () => {

    const [services, setServices] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [selectValue, setSelectValue] = useState('name')

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
      ];


    

    useEffect(() => {

        // Retrieving the data from the server
        axiosWithAuth()
            .get('https://anywhere-fitness-tt-webpt-88.herokuapp.com/services')
            .then(res => {
                console.log(res.data)
                setServices(res.data)
                
            })
            .catch(error => {
                console.log(error)
            })
        
        const results = people.filter(elem => elem.toLowerCase().includes(searchTerm.toLowerCase()))
        
       
        // const resultsTwo = services.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))

        //const str = JSON.stringify(resultsTwo);
        //console.log(`Results Two: ${str}`)
        

        //setSearchResults(resultsTwo)

        if (selectValue === "name") {
            const resultsTwo = services.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "intensity") {
            const resultsTwo = services.filter(elem => elem.intensity.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "type") {
            const resultsTwo = services.filter(elem => elem.type.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "date") {
            const resultsTwo = services.filter(elem => elem.date.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "duration") {
            const resultsTwo = services.filter(elem => elem.duration.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "location") {
            const resultsTwo = services.filter(elem => elem.location.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else if (selectValue === "numberOfRegisteredAttendees") {
            const resultsTwo = services.filter(elem => elem.numberOfRegisteredAttendees.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        }




    },[searchTerm])

    const handleChange = e => {

        setSearchTerm(e.target.value)
    }

    const handleSelectChange = e => {
        
        setSelectValue(e.target.value)
        console.log(selectValue)
    }

    const handleSelectSubmit = e => {
        console.log(selectValue)
        e.preventDefault()
    }
    

    return (

        // Creating a very rudimentary search bar
        <ServiceListContext.Provider value={{services}}>
       
       <div>
       <ServiceList></ServiceList>
    <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
    >
    </input>


        {searchResults.map(item => {
            {console.log(`This should show up: ${item}`)}
            return (<p id="searchResults" id={item.id}>{item.name} {item.date} {item.duration} {item.intensity} {item.location} {item.maxServiceSize} {item.numberOfRegisteredAttendees} {item.type}</p>)
        })}

 


    <form onSubmit={handleSelectSubmit}>
    <select value={selectValue} onChange={handleSelectChange}>
        <option value="name">Name</option>
        <option value="intensity">Intensity</option>
        <option value="type">Type</option>
        <option value="date">Date</option>
        <option value="duration">Duration</option>
        <option value="location">Location</option>
        <option value="numberOfRegisteredAttendees">Number of Registered Attendees</option>
    </select>
    <input type="submit" value="Submit" />
    </form >
    </div>

    

        </ServiceListContext.Provider>
 

            
    )
}

