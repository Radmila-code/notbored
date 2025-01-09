import './App.css';
import { useEffect, useState, useCallback } from 'react';
import video from './Motion Graphics.mp4';


function App() {

  const [tips, setTips] = useState("");
  const [colorIndex, setColorIndex] = useState(0); 
  
  const colors = ["red", "green", "blue", "orange", "purple"];

  const fetchTips = useCallback(async () => { 
    const response = await fetch(`https://bored.api.lewagon.com/api/activity`); 
    const data = await response.json(); 
    setTips(data.activity); 
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); 
  }, [colors.length]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips])

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
         <source src={video} type="video/mp4"/>
        </video>
        <h1 className='underline-yellow'>Ideas for a fun time!</h1>
      </div>

      <div className="container">
        <p className='advice' style={{ color: colors[colorIndex] }}> {tips} </p>
      </div>
      
      <div className="container">
        <button onClick={fetchTips}>New Tip</button>
      </div>
    </div>
  );
}

export default App;
