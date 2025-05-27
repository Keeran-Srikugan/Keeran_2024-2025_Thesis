import React from 'react'; 
import { Link } from 'react-router-dom';
import '../StyleSheets/HomePage.css';

function HomePage() {
  return (
    <div className="HomePage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/"><button button className = "Home">Back to Main</button></Link>
      </nav>

      {/* Title Section */}
      <h2 className="title">Welcome to the Piano Sight Reading Assistant</h2>
      <h2 className="authors">By: Keeran Srikugan, Christopher Collins and Mariana Shimabukuro </h2>
      <div className="button-container">
        <Link to="/NoteSelectionPage"><button className = "Assesment">Start Assessment</button></Link>
        <Link to="/ListExercises"><button className = "Exercises" >Exercises</button></Link>
        <Link to="/Page3"><button className = "About" >About</button></Link>
      </div>
    </div>
  );
}

export default HomePage;