/* 
By:Keeran Srikugan
*/
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import image1 from "../MusicSheets/Mary_Had_A_Little_Lamb.png"; 
import image2 from "../MusicSheets/Over_The_Rainbow.png";

import '../StyleSheets/NoteSelection.css';


const NoteSelectionPage = () => {
    const[selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const images = [image1, image2];



    const handleNavigate = () => {
        if (selectedImage) {
            navigate('/page4', { state: { image: selectedImage } });
        }
    };

    return (
      <div>
        <nav className="navbar">
          <Link to="/"><button button className = "Home">Back to Main</button></Link>
        </nav>
          <div className="container" >
            <h1 className="MainTitle">Note Selection Page</h1>
            <div id="PianoSheet"> {images.map((image,index) => (
              <img className = "sheet" key={index} src={image}
              style={{ border: selectedImage === image ? '3px solid rgb(158, 129, 93)' : '1px solid gray', cursor: 'pointer',  width: "100%", maxWidth: "400px", height: "auto" , padding: "20px", }}
              onClick={() => setSelectedImage(image)}/>))}
            </div>
            <div id='Buttons'>
              <button id="ContinueButton" onClick={handleNavigate}>Continue</button>
            </div>
          </div>
      </div>
      );
};

export default NoteSelectionPage;