import './App.css';
import WeatherPage from './component/WeatherPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SettingsPage from './component/SettingsPage';
import {  useEffect, useState } from 'react';


function App() {
  
  let [settings,setSettings]= useState({ temp:'c',
  wfdays:5})
  let [city, setCity] = useState('kalyan')
  let [day,setDay]=useState(0);
  let [weatherstatus,setWeathertatus] = useState(null)

  let [myStyle,setMystyle]=useState({})





  useEffect(()=>{
    function getImg(d){
 
      if(weatherstatus.includes('Sunny')){
        setWeathertatus('clear')
      }else if(weatherstatus.includes('snow')){
        setWeathertatus('snow')
      }else if(weatherstatus.includes('rain')){
        setWeathertatus('rain')
      }else if(weatherstatus.includes('cloud')){
        setWeathertatus('overcast')
      }
     
  
      let images=[`/${d}/${weatherstatus}/img1.jpg`,`/${d}/${weatherstatus}/img2.jpg`,`/${d}/${weatherstatus}/img3.jpg`]
      let rnum= Math.floor((Math.random() * 3));
      console.log(images[rnum])
      console.log(weatherstatus)
      return images[rnum];
  
  
    }
    if(weatherstatus!==null){
    setMystyle({
      backgroundImage:`url('${day===1?getImg('daytime'):getImg('nighttime')}') `,
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat'
    })
  }
  },[weatherstatus,day])
    
  
    
  

  return (
    <>
    <div id='background-page'style={myStyle}>
    <div id='container' >

    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WeatherPage settings={settings} setDay={setDay} city={city} setCity={setCity} weatherstatus={weatherstatus} setWeathertatus={setWeathertatus} />} />
        <Route exact path='/settings' element={<SettingsPage setSettings={setSettings} settings={settings}/>} />
        
      </Routes>
    </BrowserRouter>
    </div>
    </div>
    </>
  );
}

export default App;
