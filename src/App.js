import './App.css';
import WeatherPage from './component/WeatherPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SettingsPage from './component/SettingsPage';
import { useEffect, useState } from 'react';


function App() {

  // this state stores all the settings which user want
  let [settings, setSettings] = useState({ temp: localStorage.getItem('temp') !== null ? localStorage.getItem('temp') : 'c', bgimage: null, defaultcheck: true })


  let [city, setCity] = useState('Mumbai')
  let [day, setDay] = useState(0);
  let [weatherstatus, setWeathertatus] = useState(null)
  let [myStyle, setMystyle] = useState({})




  // this will check weather user already choosed any bgimage ? or not ? , if not ?then it will display bgimage according to weather status
  useEffect(() => {
    function getImg(d) {

      if (weatherstatus.includes('Sunny')) {
        setWeathertatus('clear')
      } else if (weatherstatus.includes('snow')) {
        setWeathertatus('snow')
      } else if (weatherstatus.includes('rain')) {
        setWeathertatus('rain')
      } else if (weatherstatus.includes('cloud')) {
        setWeathertatus('overcast')
      } else if (weatherstatus.includes('Overcast')) {
        setWeathertatus('overcast')
      } else {
        setWeathertatus('clear')
      }


      let image = [`/${d}/${weatherstatus}/img1.jpg`]

      return image;


    }

    // checks image path is present in setting state or not
    if (settings.bgimage === null) {
      // checks image path is present in local storeage  or not
      if (localStorage.getItem('bgimage') === null) {
        //checks weather status is available or not , if available it will display bg image according to status 
        if (weatherstatus !== null) {
          setMystyle({
            backgroundImage: `url('${day === 1 ? getImg('daytime') : getImg('nighttime')}') `,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          })
        }
      } else {

        settings.defaultcheck = false;
        setMystyle({
          // shows bg image that is present in local storeage
          backgroundImage: `url('${localStorage.getItem('bgimage')}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        })
      }
    } else {

      setMystyle({
        // shows bg image that path is available in setting state
        backgroundImage: `url('${settings.bgimage}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      })
    }
  }, [weatherstatus, day, city, settings])





  return (
    <>
      <div id='background-page' style={myStyle}>
        <div id='container' >

          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<WeatherPage settings={settings} setDay={setDay} city={city} setCity={setCity} weatherstatus={weatherstatus} setWeathertatus={setWeathertatus} />} />
              <Route exact path='/settings' element={<SettingsPage setSettings={setSettings} settings={settings} />} />

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
