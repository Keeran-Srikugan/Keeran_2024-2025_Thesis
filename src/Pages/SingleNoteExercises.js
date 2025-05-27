import React, { useState, useEffect, useRef } from 'react';

import keyboard from "../ExerciseImages/piano_keys.png";

import treble from "../ExerciseImages/treble_cleff_image.png";
import note from "../ExerciseImages/Note.png";
import sharp from "../ExerciseImages/sharp.png";
import flat from "../ExerciseImages/flat.png";
import lineNote from "../ExerciseImages/Note_With_Line.png";


import right from "../ExerciseImages/CorrectNote.png"
import rightLine from "../ExerciseImages/Note_With_Line_Correct.png"
import rightSharp from "../ExerciseImages/CorrectSharp.png"
import rightFlat from "../ExerciseImages/CorrectFlat.png"

import wrong from "../ExerciseImages/IncorrectNote.png"
import wrongLine from "../ExerciseImages/Note_With_Line_Incorrect.png"
import wrongSharp from "../ExerciseImages/IncorrectSharp.png"
import wrongFlat from "../ExerciseImages/flat_error.png"


import '../StyleSheets/Exercise1.css';
import { Link} from 'react-router-dom';




function SingleNoteExercises() {

  const [padBot, setPadBot] = useState(1);
  const [padWrongX, setPadWrongX] = useState(100);
  const [padWrongY, setPadWrongY] = useState(50);
  const [padRightX, setPadRightX] = useState(130);
  const [padRightY, setPadRightY] = useState(50);



  const [showNote, setShowNote] = useState(false); 
  const [isStartVisible, setStartVisible] = useState(true);
  const [isSharp, setSharp] = useState(false);
  const [isFlat, setFlat] = useState(false);
  const [isRegNote, setRegNote] = useState(true);
  const [prevNumber, setPrevNumber] = useState(null);
  const [isLineNote, setLineNote] = useState(true);

  const [showCheckmark, setShowCheckmark] = useState(false); 
  const [showRightLine, setShowRightLine] = useState(false); 
  const [showRightSharp, setShowRightSharp] = useState(false); 
  const [showRightFlat, setShowRightFlat] = useState(false); 

  const [showWrongmark, setShowWrongmark] = useState(false);
  const [showWrongLine, setShowWrongLine] = useState(false); 
  const [showWrongSharp, setShowWrongSharp] = useState(false); 
  const [showWrongFlat, setShowWrongFlat] = useState(false); 


  const [showKeyCorrect, setShowKeyCorrect] = useState(false); 
  const [showKeyWrong, setShowKeyWrong] = useState(false); 

  const [ended, setEnded] = useState(false); 
  const [showKeyboard, SetShowKeyboard] = useState(true);



  const [midiAccess, setMidiAccess] = useState(null);
  const [ ,setIsReading] = useState(false);
  const [midiInputs, setMidiInputs] = useState([]);

  const [timeLeft, setTimeLeft] = useState(10);
  const [correctScore, setCorrectScore] = useState(0);
  const [isActive, setIsActive] = useState(false);




  

  


  const notes_values = [60,61,62,63 ,64 ,65 ,66 ,67 ,68 ,69 ,70 ,71 ,72 ]
  const notes_strings_sharp = ["C","C Sharp","D","D Sharp", "E", "F", "F Sharp", "G", "G Sharp", "A", "A Sharp", "B" ]
  const notes_strings_flat = ["C","D Flat","D", "E Flat","E","F", "G Flat", "G", "A Flat", "A", "B Flat", "B" ]




  var correctNote = 0;

  var ExerciseNumberCorrect = 0;
  var totalNumExercise = 5;
  const totalCheck = useRef(0);
  var sharpCheck = false;
  var flatCheck = false;
  var lineCheck = false;
  var regularCheck = false;

  useEffect(() => {
  
      navigator.requestMIDIAccess()
        .then((access) => {
          setMidiAccess(access);
          updateMidiInputs(access);
          access.onstatechange = () => updateMidiInputs(access);
        })
        .catch((err) => {
          console.error('Failed to get MIDI access:', err);
        });
  

      return () => {
        if (midiAccess) {
          midiAccess.onstatechange = null;
        }
      };
  
    }, []);


    

    

    const updateMidiInputs = (access) => {
      const inputs = Array.from(access.inputs.values());
      setMidiInputs(inputs);
    };



    const startReading = () => {

      //Generating Notes:


    

      rollRandomNumber();
      setIsReading(true);
  
      midiInputs.forEach((input) => {
        input.onmidimessage = handleMidiMessage;
      });

      //Hide the button once started
      setStartVisible(false);
    

    };



    const handleMidiMessage = (message) => {
      var notes = ["C","C#","D","D#", "E", "F","F#","G","G#","A","A#","B"];

  
      var note_convert = notes[message.data[1]%12];
      const currentTime = Date.now();
  
      if (message.data[0] === 144){
        var note_to_add = [message.data[1], note_convert,currentTime];
        console.log(message.data[1])
        //console.log("Midi Input: " + note_to_add);
        //console.log("Correct Note:" + correctNote);
        var x;
        var y;

        
        if(message.data[1] === 60){
          x = -20;
          y = 150;
        }else if(message.data[1] === 61){
          x = 4;
          y = 75;
        }else if(message.data[1] === 62){
          x = 25;
          y = 150;
          
        }else if(message.data[1] === 63){
          x = 47;
          y = 75;
        }else if(message.data[1] === 64){
          x = 67;
          y = 150;
        }else if(message.data[1] === 65){
          x = 110;
          y = 150;
        }else if(message.data[1] === 66){
          x = 132;
          y = 75;
        }else if(message.data[1] === 67){
          x = 152;
          y = 150;
        }else if(message.data[1] === 68){
          x = 175;
          y = 75;
        }else if(message.data[1] === 69){
          x = 196;
          y = 150;
        }else if(message.data[1] === 70){
          x = 218;
          y = 75;
        }
        else if(message.data[1] === 71){
          x = 238;
          y = 150;
        }



        setPadWrongX(x);
        setPadWrongY(y);















        if(message.data[1] === correctNote){

          setShowKeyCorrect(true);
          
          ExerciseNumberCorrect = ExerciseNumberCorrect + 1;
          setCorrectScore(ExerciseNumberCorrect);

          console.log("Adding one to completed exercise.");
          totalCheck.current += 1;
          
          
          
          console.log(isSharp);
          console.log(isFlat);

          if(flatCheck){
            setShowRightFlat(true);
          }
          if(sharpCheck){
            setShowRightSharp(true);
          }
          if(regularCheck){
            setShowCheckmark(true);
          }
          if(lineCheck){
            setShowRightLine(true);
          }

          console.log("Flat: " + flatCheck);
          console.log("Sharp: " +sharpCheck);
          console.log("Regular: " +regularCheck);
          console.log("Line in: " +lineCheck);
          
          setTimeout(() => {
            stopAndResetTimer();

            if(totalCheck.current === 5){
              console.log("Done!!")
              EndActivity();

            }else{
              rollRandomNumber();
            }
          
          }, 2000);
          
          
        }else{

          setShowKeyCorrect(true);
          setShowKeyWrong(true);
          

          console.log("Adding one to completed exercise.");
          totalCheck.current += 1;
          

          setShowWrongmark(true);

          console.log("Flat: " + flatCheck);
          console.log("Sharp: " +sharpCheck);
          console.log("Regular: " +regularCheck);
          console.log("Line in: " +lineCheck);

          if(flatCheck){

            setShowWrongFlat(true);
              
          }else if(sharpCheck){
            setShowWrongSharp(true);

          }


          if(regularCheck){

            setShowWrongmark(true);

        
          }else if(lineCheck){

            setShowWrongLine(true);
        
          }

          setTimeout(() => {
            stopAndResetTimer();

            if(totalCheck.current === 5){
              console.log("Done!!")
              EndActivity();
            }else{
              rollRandomNumber();
            }
            
            
          }, 2000);
          
        }


      } 
    };


    //This code is the code that runs for the timer
    useEffect(() => {
      let timer;
      if (isActive && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsActive(false);

        

        console.log("Timer Ended");
        stopAndResetTimer();

        if (totalCheck.current === 5 ){
          console.log("Done!!")
          EndActivity();
        }else{
          rollRandomNumber();
          startTimer();
          totalCheck.current += 1;
          

        }

        

      }
  
      return () => clearInterval(timer); // Cleanup the timer when stopped
    }, [isActive, timeLeft]);
  
    const startTimer = () => {
      setIsActive(true);
    };
  
    const stopAndResetTimer = () => {
      setIsActive(false);
      setTimeLeft(10); 

    };






  const rollRandomNumber = () => {

    startTimer();
    setShowNote(true);


    setShowRightSharp(false);
    setShowRightFlat(false);
    setShowCheckmark(false);
    setShowRightLine(false);


    setShowWrongSharp(false);
    setShowWrongFlat(false);
    setShowWrongmark(false);
    setShowWrongLine(false);


    setShowKeyCorrect(false);
    setShowKeyWrong(false);




  
    var number;
    do {
      number = Math.floor(Math.random() * 12);
    } while (
      number === prevNumber
    );



    correctNote = notes_values[number];
    setPrevNumber(number);
    

    //This if statement handles all notes that are not sharps or flats
    if(number === 0 || number === 2 || number === 4 || number === 5 || number === 7 || number === 9 || number === 11){
      
      setFlat(false);
      setSharp(false);

      sharpCheck = false;
      flatCheck = false;



      if(number === 0){
        setRegNote(false);
        setLineNote(true);

        lineCheck = true;
        regularCheck = false;


        var padBot = 7;

        var x = -20;
        var y = 150;

        setPadBot(padBot);

        setPadRightX(x);
        setPadRightY(y);

      }else{
        setRegNote(true);
        setLineNote(false);


        lineCheck = false;
        regularCheck = true;
        
        if(number === 2){
          padBot = 15;
          
          x = 25;
          y = 150;
        }else if (number === 4){
          padBot =  23 ;

          x = 67;
          y = 150;
        }else if (number === 5){
          padBot =  28 ;

          x = 110;
          y = 150;
        }else if (number === 7){
          padBot =  34;

          x = 152;
          y = 150;
        }else if (number === 9){
          padBot =  41 ;

          x = 196;
          y = 150;
        }else if (number === 11){
          padBot =  47 ;

          x = 238;
          y = 150;
        } 
        setPadBot(padBot);

        setPadRightX(x);
        setPadRightY(y);
      
        
      }
      console.log(notes_values[number]);
      console.log(notes_strings_sharp[number]);

    }
    else{

      if(number === 1){
        x = 4;
        y = 75;
      }else if (number === 3){
        x = 47;
        y = 75;
      }else if (number === 6){
        x = 132;
        y = 75;
      }else if (number === 8){
        x = 175;
        y = 75;
        
      }else if (number === 10){
        x = 218;
        y = 75;
      }

      setPadRightX(x);
      setPadRightY(y);





      var flatOrSharp = Math.floor(Math.random() * 2); 

      //This is where all the notes with sharps are dealt with
      if(flatOrSharp === 0){
        setFlat(false);
        setSharp(true);
        setRegNote(true);
        setLineNote(false);

        sharpCheck = true;
        flatCheck = false;
        lineCheck = false;
        regularCheck = true;

        console.log(notes_values[number]);
        console.log(notes_strings_sharp[number]);

        if(number === 1){ 
          setRegNote(false);
          setLineNote(true);

          lineCheck = true;
          regularCheck = false;

          padBot = 7;
        }else if (number === 3){
          padBot =  15 ;
        }else if (number === 6){
          padBot =  28 ;
        }else if (number === 8){
          padBot =  34 ;
        }else if (number === 10){
          padBot =  41 ;
        }
        setPadBot(padBot);

       

      }
      //This is where all the notes with flats are dealt with
      else{
        setFlat(true);
        setSharp(false);
        setRegNote(true);
        setLineNote(false);



        sharpCheck = false;
        flatCheck = true;
        lineCheck = false;
        regularCheck = true;
        
        console.log(notes_values[number]);
        console.log(notes_strings_flat[number]);

        if(number === 1){
          padBot = 15;
        }else if (number === 3){
          padBot = 23;
        }else if (number === 6){
          padBot =  34 ;
        }else if (number === 8){
          padBot =  41 ;
        }else if (number === 10){
          padBot =  47;
        }
        setPadBot(padBot);
        
      }


    }

    number = 0;


  };


  const EndActivity = () => {
    stopAndResetTimer();
    console.log("Done Activity");

    setShowNote(false);


    setShowRightSharp(false);
    setShowRightFlat(false);
    setShowCheckmark(false);
    setShowRightLine(false);


    setShowWrongSharp(false);
    setShowWrongFlat(false);
    setShowWrongmark(false);
    setShowWrongLine(false);

    setShowKeyCorrect(false);
    setShowKeyWrong(false);

    SetShowKeyboard(false);
    setEnded(true);
    
    const tips = localStorage.getItem("tips");
    console.log(tips);

  }




  var imageStyle = {
    position: "absolute",
    bottom: padBot + "%", // Adjusted to a percentage so it scales with the container
    left: "58%", // Centered horizontally
    transform: "translateX(-50%)",
    width: "23%", // Relative to viewport width
    height: "auto",
  };
  var imageStyle2 = {
    
    left: "47%",
    bottom: (padBot-2)+ "%",
    width: "12%",  // Adjust size as needed
    height: "auto"
  };

  var imageStyle3 = {
    left: "47%",
    bottom: (padBot+1)+"%",
    width: "11%",  // Adjust size as needed
    height: "auto"
  };

  var correctN = {
    position: 'absolute',
    top: padRightY + 'px', 
    left: padRightX + "px", 
    zIndex: 2,
    width: '80px',
    height: '80px',
  }

  var wrongN = {
    position: 'absolute',
    top: padWrongY + 'px', 
    left: padWrongX +"px", 
    zIndex: 2,
    width: '80px',
    height: '80px',

  }

  const restart = () => {
    setCorrectScore(0);
    totalCheck.current = 0;
    SetShowKeyboard(true);
    setEnded(false);
    rollRandomNumber();
  }
  

 return (
  <div>
    <nav className="navbar">
      <Link to="/">
        <button className="Home">Back to Main</button>
      </Link>
    </nav>
    <div className="body">
      <h1>Welcome to the single note exercise:</h1>
      <div className="NoteSelection">
        <img className="treble" src={treble} alt="Treble Clef" />
        {showNote && (
          <>
            {isRegNote && <img className='note' src={note} alt="Note" style={imageStyle} />}
            {isSharp && <img className='note' src={sharp} alt="Sharp" style={imageStyle2} />}
            {isFlat && <img className='note' src={flat} alt="Sharp" style={imageStyle3} />}
            {isLineNote && <img className='note' src={lineNote} alt="Sharp" style={imageStyle} />}

            {showCheckmark && <img className='note' src={right} alt="Note" style={imageStyle} />}
            {showRightLine && <img className='note' src={rightLine} alt="Note" style={imageStyle} />}
            {showRightSharp && <img className='note' src={rightSharp} alt="Note" style={imageStyle2} />}
            {showRightFlat && <img className='note' src={rightFlat} alt="Note" style={imageStyle3} />}


            {showWrongmark && <img className='note' src={wrong} alt="Note" style={imageStyle} />}
            {showWrongLine && <img className='note' src={wrongLine} alt="Note" style={imageStyle} />}
            {showWrongSharp && <img className='note' src={wrongSharp} alt="Note" style={imageStyle2} />}
            {showWrongFlat && <img className='note' src={wrongFlat} alt="Note" style={imageStyle3} />}
          </>
        )}
      </div>
      <div className="TimeAndScore">
        <p>Time: {timeLeft}s</p>
        <p>Score: {correctScore}/{totalNumExercise}</p>
        <p>Completed: {totalCheck.current}/{totalNumExercise}</p>
      </div>
      <div className="random-number">
        {isStartVisible && <button onClick={startReading}>Start</button>}
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
  {showKeyboard &&<img
    id="note"
    src={keyboard}
    alt="Selected"
    style={{ display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
  />}

  {showKeyWrong && (
    <svg style={wrongN}>
      <circle cx="40" cy="40" r="15" stroke="black" strokeWidth="3" fill="red" />
    </svg>
  )}

  {showKeyCorrect && (
    <svg style={correctN}>
      <circle cx="40" cy="40" r="15" stroke="black" strokeWidth="3" fill="green" />
    </svg>
  )}
</div>
<div>{ended && 
  <p>
  Assessment Completed!
</p>}
{ended && (
  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
      <Link to="/">
        <button >Back to Main</button>
      </Link>
    <button onClick={restart}>Restart</button>
  </div>
)}
  
</div>
  
    </div>
  </div>
);
}

export default SingleNoteExercises;
