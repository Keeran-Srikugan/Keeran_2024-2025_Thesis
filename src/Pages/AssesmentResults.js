import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import OpenAI from "openai";

import '../StyleSheets/AssesmentResults.css';


const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

function AssesmentResults() {
  const message = localStorage.getItem("notes");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSingleNoteExe, setSingleNoteExe] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [improvementTips, setImprovementTips] = useState("");

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const analyzeNotes = async () => {
    setLoading(true);

    try {
      console.log("API call Done!")
      const result = await openai.chat.completions.create({
        model: 'o3-mini',
        messages: [
          {
            role: "developer",
            content: [
              {
                type: "text",
                text: "You are a professional piano assistant. Given a list of notes played by the user and notes that are expected, identify the errors and categorize them into categories. For each error found with a note or chord, list and classify it as one of the following: \"Failed to read chord\", \"Failed to read key signature\",  \"Wrong octave\" and \"Failed to read note\".  For context, number 21 is the first key (an A key) and number 108 is the final key (a C key) on the piano. For played notes, each line of notes represents a chord or notes played together in unison and the order of the notes does not matter per line. For the expected notes, () brackets show what notes should be played at the same time and are not chords. Notes that are in [] are part of a chord.\n\n\"Failed to read chord\" - The three expected notes for the chord are not all played within the line.\n\n\"Failed to read key signature\" - Based on the key signature provided, if there is an error with a note check if it is because they did not play the key signature which is a sharp or a flat.\n\n\"Wrong octave\" - The note letter is correct, but it is played in a different octave.\n\n\"Failed to read note\" - This is simply when there is an error with playing a note and it does not fall under any of the previous categories.\n\nOnly return a count of how many errors were caused while playing for each section. If no errors are found, return \"You played it perfectly. \".\n\nAfter the count is completed, return one line that states \"Most reoccurring error:\" and list which of the 4 errors is the most reoccurring. If it was played perfectly state \"None\" in this field. If two more categories are tied, use the following list from most important to least important to select the error: \"Failed to read note\",  \"Failed to read chord\", \"Failed to read key signature\", \"Wrong octave\".\n\n\nAt the very end, provide 1 - 2 sentences on how the user can improve on the most reoccurring error.\n"
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Key Signature: None\nCorrect Notes: (48 [52 55 60]), 60, 67, 67, (57 53 69), 69, ( 55 52 67), (53 65), 65, (52 64), 64, (62 50), 62, (48 [52 55 60]),\nPlayed Notes:\n48 55 52 60\n60\n67\n67\n57 53 69\n69\n67 55 52\n53 65\n65\n52 64\n64\n62 50\n62\n52 48 55 60"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "You played it perfectly.  \nMost reoccurring error: None  \nKeep up the great work and continue practicing to maintain your precision!"
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Key Signature: None\nCorrect Notes: (48 [52 55 60]), 60, 67, 67, (57 53 69), 69, ( 55 52 67), (53 65), 65, (52 64), 64, (62 50), 62, (48 [52 55 60]),\nPlayed Notes:\n48 55 52 60\n60\n66\n67\n57 53 69\n69\n67 55 52\n53 65\n65\n52 64\n62\n62 50\n62\n52 48 55 60"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "Failed to read note: 2  \nFailed to read chord: 0  \nFailed to read key signature: 0  \nWrong octave: 0  \n\nMost reoccurring error: Failed to read note  \nTo improve on this, try focusing on listening carefully to the target pitch before playing and practice slow, deliberate repetition of single notes to ensure accurate reproduction of the expected pitch."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Key Signature: None\nCorrect Notes: (48 [52 55 60]), 60, 67, 67, (57 53 69), 69, ( 55 52 67), (53 65), 65, (52 64), 64, (62 50), 62, (48 [52 55 60]),\nPlayed Notes:\n48 51 52 60\n60\n66\n67\n57 53 69\n69\n67 55 52\n53 65\n65\n52 64\n64\n62 50\n62\n52 48 55 60"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "Failed to read note: 1  \nFailed to read chord: 1  \nFailed to read key signature: 0  \nWrong octave: 0  \n\nMost reoccurring error: Failed to read note  \nTo improve on this, focus on pitch recognition by practicing scales and single-note exercises, and slow down your playing to ensure you hit the correct note every time."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Key Signature: None\nCorrect Notes: (48 [52 55 60]), 60, 67, 67, (57 53 69), 69, ( 55 52 67), (53 65), 65, (52 64), 64, (62 50), 62, (48 [52 55 60]),\nPlayed Notes:\n48 55 52 60\n60\n67\n67\n57 53 69\n69\n67 55 52\n53 65\n53\n52 64\n64\n62 50\n62\n52 48 55 60"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "Failed to read note: 0  \nFailed to read chord: 0  \nFailed to read key signature: 0  \nWrong octave: 1  \n\nMost reoccurring error: Wrong Octave  \nTry actively visualizing the correct octave before playing, and use reference notes to anchor your hand position. Practicing slow, deliberate transitions while saying the octave aloud can also reinforce accuracy."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Dataset #5: 1 wrong chord, 1 wrong octave, failed to read note 1  \nKey Signature: None\nCorrect Notes: (48 [52 55 60]), 60, 67, 67, (57 53 69), 69, ( 55 52 67), (53 65), 65, (52 64), 64, (62 50), 62, (48 [52 55 60]),\nPlayed Notes:\n48 51 52 60\n60\n67\n67\n57 53 69\n69\n67 55 52\n53 65\n65\n52 64\n62\n62 50\n74\n52 48 55 60"
              }
            ]
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "Failed to read note: 1  \nFailed to read chord: 1  \nFailed to read key signature: 0  \nWrong octave: 1  \n\nMost reoccurring error: Failed to read note  \nTo improve on this error, isolate individual notes in your practice sessions and use a tuner or reference recording to confirm the correct pitch before moving on. Focusing on slow, deliberate practice can help ensure that each note is accurately executed."
              }
            ]
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: message,
              }

            ]
          }
        ],
        response_format: {
          type: "text"
        },
        reasoning_effort: "medium"
      });

      const responseText = result.choices[0].message.content;
      setResponse(responseText);

      const chordMatch = responseText.match(/Failed to read chord: (\d+)/);
      const keySigMatch = responseText.match(/Failed to read key signature: (\d+)/);
      const octaveMatch = responseText.match(/Wrong octave: (\d+)/);
      const noteMatch = responseText.match(/Failed to read note: (\d+)/);

      const chordErrors = chordMatch ? parseInt(chordMatch[1], 10) : 0;
      const keySignatureErrors = keySigMatch ? parseInt(keySigMatch[1], 10) : 0;
      const octaveErrors = octaveMatch ? parseInt(octaveMatch[1], 10) : 0;
      const WrongNoteErrors = noteMatch ? parseInt(noteMatch[1], 10) : 0;

      const data = [
        { name: "Chord Errors", value: chordErrors },
        { name: "Key Signature Errors", value: keySignatureErrors },
        { name: "Octave Errors", value: octaveErrors },
        { name: "Wrong Note Errors", value: WrongNoteErrors },
      ];


      const improvementMatch = responseText.match(/Most reoccurring error: .*?\n(.*?\.)\s+(.*?\.)/s);

      if (improvementMatch) {
        setImprovementTips(`${improvementMatch[1]} ${improvementMatch[2]}`);
      }

      localStorage.setItem("tips",improvementTips);
      setChartData(data);

      const reocurringErrorMatch = responseText.match(/Most reoccurring error: (.*?)\n/);
      console.log(reocurringErrorMatch[1]);
      setSingleNoteExe(reocurringErrorMatch[1] === "Failed to read note  ");


    } catch (error) {
      console.error("Error fetching response: ", error);
      setResponse("Error occurred while processing your request.");
    }

    setLoading(false);
  };



  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <button className="Home">Back to Main</button>
        </Link>
      </nav>
      <div>
      <div className="body">
        <h1>Piano Notes Analyzer</h1>
      {chartData.length === 0 && (
        <button onClick={analyzeNotes} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Notes"}
      </button>
      )}
      <div>
      {chartData.length > 0 && (
        <h2>Results:</h2>
      )}
      </div>
      <div>
        {chartData.length > 0 && (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
      <div>
        {improvementTips && (
          <div>
            <h3>Improvement Suggestions:</h3>
            <p>{improvementTips}</p>
          </div>
        )}
      </div>
      <div>
        {isSingleNoteExe && (
          <Link to="/SingleNoteExercises">
            <button className="Get Results">Single Note Exercise</button>
          </Link>
        )}
      </div>
        
      </div>
      </div>
    </div>
  );
}

export default AssesmentResults;
