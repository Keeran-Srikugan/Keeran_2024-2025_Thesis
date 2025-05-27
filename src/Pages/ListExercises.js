import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



import '../StyleSheets/ListExercises.css';


const ListExercises = () => {
    const navigate = useNavigate();





    const handleNavigate = () => {
            localStorage.setItem('generated_notes', null);
            navigate('/SingleNoteExercises', { });
        }


    return (
      <div>
        <nav className="navbar">
          <Link to="/"><button button className = "Home">Back to Main</button></Link>
        </nav>
          <div className="container" >
          <h3 className="title">Activites to help work on specific skills:</h3>
            <div id='Buttons'>
              <button id="ActivityButton" onClick={handleNavigate}>Single Note Exercises</button>
              <button id="ActivityButton" onClick={handleNavigate}>Chord Exercises</button>
              <button id="ActivityButton" onClick={handleNavigate}>Octave Exercises</button>
              <button id="ActivityButton" onClick={handleNavigate}>Key Signature Exercises</button>
            </div>
          </div>
      </div>
      );
};

export default ListExercises;