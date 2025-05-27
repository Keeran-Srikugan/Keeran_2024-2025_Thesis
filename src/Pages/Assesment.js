/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect, useState }from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../StyleSheets/Assesment.css';

function Assesment() {

  const [isStartVisible, setStartVisible] = useState(true);
  const [isEndVisible, setEndVisible] = useState(false);
  const [isGetResultsVisible,setGetResultsVisible] = useState(false);

  const [notes_add, setNotes] = useState([]);

  var notes_active = "";

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();


  
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Mary_Had_A_Little_Lamb = "(48,64),62,(43,60),62,(48,64),64,(43,64),(43,62),62,(47,62),(48,64),67,(43,67),(48,64),62,(43,60),62,(48,64),64,(43,64),64,(43,62),62,(47,64),62,(60,48)";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Over_The_Rainbow = "29,(29,31,35),35,32";

  const [midiAccess, setMidiAccess] = useState(null);
  const [ ,setIsReading] = useState(false);
  const [midiInputs, setMidiInputs] = useState([]);




  useEffect(() => {

  // Example: Print specific strings based on the image
    navigator.requestMIDIAccess()
      .then((access) => {
        setMidiAccess(access);
        updateMidiInputs(access);
        access.onstatechange = () => updateMidiInputs(access);
      })
      .catch((err) => {
        console.error('Failed to get MIDI access:', err);
      });

    // Cleanup on unmount
    return () => {
      if (midiAccess) {
        midiAccess.onstatechange = null;
      }
    };

  }, [navigate]);


  const updateMidiInputs = (access) => {
    const inputs = Array.from(access.inputs.values());
    setMidiInputs(inputs);
  };



  //Code that runs when the start button is pressed
  const startReading = () => {
    //Setting visibility for buttons
    setStartVisible(false);
    setEndVisible(true)

    console.log('Starting to read MIDI inputs...');
    setIsReading(true);

    midiInputs.forEach((input) => {
      input.onmidimessage = handleMidiMessage;
    });
  };




  const stopReading = () => {

    //Setting visibility for buttons
    setEndVisible(false);
    setGetResultsVisible(true);
    

    console.log('Stopping MIDI input reading...');
    setIsReading(false);


    

    //Here we need a call to go through the list of note and to seperate them into chords and regular notes.
    var previousTime = 0;

    notes_add.forEach((subNotes) =>{
      if(subNotes[2] - previousTime < 70){
        notes_active = notes_active + subNotes[0] + " ";
      }else{
        notes_active = notes_active + "\n" + subNotes[0] + " "
        previousTime = subNotes[2];
        
      }
    });

        //Refresh the notes that were active and played
      if(state.image === "/static/media/Over_The_Rainbow.1ccb86f19c76edd9461b.png"){
        console.log("Over the Rainbow called");
        notes_active = "Key Signature: None \n\nCorrect Notes: " + Over_The_Rainbow + "\n\nPlayed Notes:" + notes_active ;
      }else if(state.image === "/static/media/Mary_Had_A_Little_Lamb.aa97a3a0270bfdd3e97e.png"){
        console.log("Mary Had A Little Lamb");
        notes_active = "Key Signature: None \n\nCorrect Notes: " + Mary_Had_A_Little_Lamb+ "\n\nPlayed Notes:" + notes_active ;
    
      }


    console.log(notes_active);
    

    //Save the notes to local storage
    localStorage.setItem('notes', notes_active);



    midiInputs.forEach((input) => {
      input.onmidimessage = null;
    });
  };


  //Used similar to: https://jankleinert.com/blog/2020/01/22/learning-to-read-music-with-the-web-midi-api.html
  //This peice of code is what handles each individual midi message as it comes through 
  const handleMidiMessage = (message) => {
    var notes = ["C","C#","D","D#", "E", "F","F#","G","G#","A","A#","B"];
    //var octave;
    //var note;

    var note_convert = notes[message.data[1]%12];
    //var octave = Math.floor(message.data[1]/12);


    //Here format the data so only useful data 
    const currentTime = Date.now();

    if (message.data[0] === 144){
      var note_to_add = [message.data[1], note_convert,currentTime];
      setNotes((notes_add) => [...notes_add,note_to_add]);
    } 
  };





  return (
  
    <div className = "Page" style={{ textAlign: 'center'}}>
      <nav className="navbar">
        <Link to="/"><button button className = "Home">Back to Main</button></Link>
      </nav>
      <h1 id='title' style={{marginLeft: '150px'}}>Assesment Page</h1>
      {state && state.image ? (
        <img id="notePage" src={state.image} alt="Selected" style={{ marginTop: '20px' }} />
      ) : (
        <p>No image selected</p>
      )}
      <div style={{marginLeft: '150px'}}>
        {isStartVisible &&
          (<button id="startAssessment"  onClick={startReading}>Start Assesment</button>)
        }
        {isEndVisible &&
          (<button id="StopAssessment" onClick={stopReading}>Finish Assesment</button>)
        }

        {isGetResultsVisible &&
          (<div>
            <Link to="/AssesmentResultsPage"><button id='getResults' >Results</button></Link>
          </div>)
        }  

      </div>
    </div>
  );
}

export default Assesment;