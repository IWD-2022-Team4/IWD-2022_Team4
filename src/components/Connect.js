import React, { useState, useEffect } from "react";
import "./App.css";
import Photo from "./Profile";
import axios from "axios";

function App() {

   
    const [photoTitle, setPhotoTitle] = useState("");
    const [photoOfTheDay, setPhotoOfTheDay] = useState("");

  useEffect ( () => {
    axios.get("https://api.nasa.gov/planetary/apod?api_key=Q9uZaQpXyK6gmM2QCDD8t74CYjebTE7Ailvh8Mkk")
    .then (res => {

      // setPhotoTitle(res.data);
      setPhotoOfTheDay(res.data);

    })
    .catch(err =>  {
      console.log(err)
      
      setPhotoOfTheDay({
        copyright: "",
        title: "404 Photo Not Found",
        explanation: "",
        url: "",
        media_type: "",
        service_version: "",
        url: ""   
      })
    })
  }, [])


  return (
    <div className="App">
      <nav
        //Read through the instructions in the README.md file to build your NASA
        //app! Have fun <span role="img" aria-label='go!'>🚀</span>!
        photoTitle = {photoTitle.title}
      />
    </div>
  );
}

export default App;


