import React, { useEffect, useState } from 'react'
import settingicon from './images/setting-icon.png';
import { Link } from 'react-router-dom'
import userLoc from './images/user-location.png'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

export default function WeatherPage(props) {

  let [data, setData] = useState(null)
  let [loader, setLoader] = useState(true);
  let t = 0;   //for unique key 
  let p = 0;    //for unique key


  //taking user location
  function getLoc() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(showPos, (e) => { toast.info("Allow Location"); });
    } else {
      toast.error("Cant Access Location");
    }
  }



  //fetching user location
  async function showPos(pos) {
    setLoader(true)
    let res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=e4702db156d54476b862cec68d3e7b53`)
    let r = await res.json()
    props.setCity(r.results[0].components.city)
    setLoader(false)
  }


  //calculating/checking - which day is going on ,.(sunday ,monday..,etc)
  function getDayname(d) {
    if (data !== null) {
      var dt = new Date(d);
      let day = dt.getDay()
      if (day === 0) {
        return "Sunday";
      } else if (day === 1) {
        return "Monday";
      } else if (day === 2) {
        return "Tuesday";
      } else if (day === 3) {
        return "Wednesday";
      } else if (day === 4) {
        return "Thursday";
      } else if (day === 5) {
        return "Friday";
      } else {
        return "Saturday";
      }
    }
  }


  //it displays today's forecast
  function todaysForcast(e) {
    t++;
    if (Date.parse(data.current.last_updated) < Date.parse(e.time)) {
      return (
        <div key={t}>
          <p>{e.time.slice(11, 13) > 12 ? e.time.slice(11, 16) + 'PM' : e.time.slice(11, 16) + 'AM'}</p>
          <img src={e.condition.icon} alt="data" />
          <p>{props.settings.temp === 'c' ? e.temp_c + '℃' : e.temp_f + '°F'}</p>
          <p>{e.condition.text}</p>
        </div>
      )
    }
  }

  //it displays next 4 days forecast
  function upForecast(e) {
    p++
    if (e.date !== data.location.localtime.slice(0, 10)) {
      return (<div key={p * 2}>
        <p>{getDayname(e.date)}</p>
        <img src={e.day.condition.icon} alt="data" />
        <p>{props.settings.temp === 'c' ? e.day.avgtemp_c + '℃' : e.day.avgtemp_f + '°F'}</p>
        <p>{e.day.condition.text}</p>
      </div>
      )
    }
  }


  //checks wheather user entered city name or not and also forwards users entered city name to city state       
  function searchcity() {
    let cityInput = document.getElementById('cityInput').value;
    if (cityInput.length > 0) {
      props.setCity(cityInput);
    } else {
      toast.error("Please Enter City Name");
    }
  }


  //taking data from api and storing that data to the state
  useEffect(() => {
    try {
      fetchData()
      async function fetchData() {
        setLoader(true)
        let url = ` http://api.weatherapi.com/v1/forecast.json?key=05ae538d5ea94c9989183803232102&q=${props.city}&days=5&aqi=no&alerts=no`
        let responce = await fetch(url)
        let data = await responce.json()
        console.log(data)
        if (data.error !== undefined) {
          toast.error("Please Enter Valid City Name");
          setLoader(false)
        } else {
          setData(data)
          props.setDay(data.current.is_day)
          await props.setWeathertatus(data.current.condition.text)
          setLoader(false)
        }
      }
    } catch (e) {
      toast.error("Please Enter Valid City Name");
    }

    // eslint-disable-next-line 
  }, [props.city, props.weathertatus]);



  //if api data is available it will write the data to jsx otherwise it will show loading icon 
  if (loader === false) {
    return (
      <>
        <section >

          <Link to='/settings'>
            <Tippy content={<span>Settings</span>}>
              <img src={settingicon} alt="setting-icon" id='setting-icon' />
            </Tippy>
          </Link>


          <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress={undefined}
            theme="dark"
            color='black' />

          <div id='city-panel'>
            <div id='city-section'>
              <img src={data.current.condition.icon} alt="" width={70} />
              <div >
                <h1 id='city-name'> {data.location.name}</h1>
                <small>{data.location.region},{data.location.country}</small>
              </div>
            </div>
            <div>
              <p>{getDayname(data.location.localtime)}</p>
              <small>{data.location.localtime.slice(0, 10)}</small>
            </div>
          </div>



          <div id='temp-panel'>
            <h1>{props.settings.temp === 'c' ? data.current.temp_c + '℃' : data.current.temp_f + '°F'}</h1>
            <div>
              <ul id='list-temp-data'>
                <li>{data.current.condition.text} </li>
                <li>Wind speed :{props.settings.temp === 'c' ? data.current.wind_kph + " Km/h" : data.current.wind_mph + "Mph"} & Humidity:{data.current.humidity}%</li>
                <li>Sunrise:{data.forecast.forecastday[0].astro.sunrise}& Sunset:{data.forecast.forecastday[0].astro.sunset}</li>
              </ul>
            </div>
          </div>

          <div id='down'>
            <div id='forcast'>
              <div className='forcast-selector'><p>Today</p></div>
              <div className='days'>
                {data.forecast.forecastday[0].hour.map(todaysForcast)}
              </div>

              <div className='forcast-selector'><p>Upcomming Days:</p></div>
              <div className='days'>{data.forecast.forecastday.map(upForecast)}</div>
            </div>


            <div id='search-box'>
              <Tippy content={<span>Your Location Weather</span>}>
                <img src={userLoc} alt="user location icon" id='user-loc-icon' onClick={getLoc} />
              </Tippy>
              <input type="text" placeholder='Search Another location' id='cityInput' onChange={(evt) => { evt.value = evt.target.value }} />

              <button onClick={() => { searchcity() }}></button>
            </div>

          </div>
          <div id='last-update'>Last Updated: {data.current.last_updated}</div>

        </section>

      </>
    )
  }
  else {

    //if data is not available this loading icon will occur
    return (<ReactLoading type={'spin'} color={'blue'} height={'20px'} width={'20px'} id='loader' />)
  }

}
