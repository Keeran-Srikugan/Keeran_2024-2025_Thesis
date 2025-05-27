import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

// Import the page components
import HomePage from './Pages/HomePage';
import NoteSelectionPage from './Pages/NoteSelectionPage';
import ListExercises from './Pages/ListExercises';
import SingleNoteExercises from './Pages/SingleNoteExercises';
import Page3 from './Pages/Page3';
import Assesment from './Pages/Assesment';
import AssesmentResultsPage from './Pages/AssesmentResults'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/NoteSelectionPage" element={<NoteSelectionPage />} />
        <Route path="/ListExercises" element={<ListExercises />} />
        <Route path="/Page3" element={<Page3 />} />
        <Route path="/page4" element={<Assesment />} />
        <Route path="/AssesmentResultsPage" element={<AssesmentResultsPage />} />
        <Route path="/SingleNoteExercises" element={<SingleNoteExercises />} />
      </Routes>
    </Router>
  );
}

export default App;