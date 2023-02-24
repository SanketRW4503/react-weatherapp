import './App.css';
import WeatherPage from './component/WeatherPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SettingsPage from './component/SettingsPage';
import { useState } from 'react';
import nightimg from './component/images/nighttime/night1.jpg'
import nightimg2 from './component/images/nighttime/night2.jpg'
import nightimg3 from './component/images/nighttime/night3.jpg'
import nightimg4 from './component/images/nighttime/night4.jpg'

import dayimg1 from './component/images/daytime/day.jpg'
import dayimg2 from './component/images/daytime/day2.jpg'
import dayimg3 from './component/images/daytime/day3.jpg'
import dayimg4 from './component/images/daytime/day4.jpg'




function App() {

  let [settings,setSettings]= useState({ temp:'c',
  wfdays:5})
  let [city, setCity] = useState('kalyan')


  let [day,setDay]=useState(0);

  function getDayimg(){
    let dayimages=[dayimg1,dayimg2,dayimg3,dayimg4]
    let rnum= Math.floor((Math.random() * 3));
    return dayimages[rnum];

  }
  function getNightimg(){
    let nightimages=[nightimg,nightimg2,nightimg3,nightimg4]
    let rnum= Math.floor((Math.random() * 3));
    console.log("day is "+day+rnum)
    return nightimages[rnum];

  }
  let myStyle ={
    backgroundImage:`url('${day===1?getDayimg():getNightimg()}') `,
    backgroundSize:'cover',
    backgroundRepeat: 'no-repeat'
    
    
  }

  document.body.style={myStyle}
  


  return (
    <>
    <div id='background-page'style={myStyle}>
    <div id='container' >

    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WeatherPage settings={settings} setDay={setDay} city={city} setCity={setCity} />} />
        <Route exact path='/settings' element={<SettingsPage setSettings={setSettings} settings={settings}/>} />
        
      </Routes>
    </BrowserRouter>
    </div>
    </div>
    </>
  );
}

export default App;
