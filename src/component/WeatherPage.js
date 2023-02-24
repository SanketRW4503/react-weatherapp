import React, { useEffect, useState } from 'react'
import settingicon from './images/setting-icon.png';
import { Link } from 'react-router-dom'
import userLoc from './images/user-location.png'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function WeatherPage(props) {

  let [data, setData] = useState(null)
  
  function getLoc(){


    if("geolocation" in navigator){

    navigator.geolocation.getCurrentPosition(showPos,(e)=>{
      toast.info("Allow Location", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        color:'black'
        });
    })
      
    }else{
      toast.error("Cant Access Location", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        color:'black'
        });
    }
  }
  
 async function showPos(pos){

    let res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=e4702db156d54476b862cec68d3e7b53`)
    let r = await res.json()
    console.log(r)
    console.log(r.results[0].components.city);
    props.setCity(r.results[0].components.city)
  }

  function getDayname(d){
    if(data!==null){
    var dt = new Date(d);
    let day=dt.getDay()
    console.log('its'+day)
    if(day===0){
      return "Sunday";
    }else if(day===1){
      return "Monday";
    }else if(day===2){
      return "Tuesday";
    }else if(day===3){
      return "Wednesday";
    }else if(day===4){
      return "Thursday";
    }else if(day===5){
      return "Friday";
    }else{
      return "Saturday";
    }
    }
  }
  useEffect(() => {
      async function fetchData() {

      
      
      let url = ` http://api.weatherapi.com/v1/forecast.json?key=05ae538d5ea94c9989183803232102&q=${props.city}&days=5&aqi=no&alerts=no`
      let responce = await fetch(url)
      let data = await responce.json()

      setData(data)
      props.setDay(data.current.is_day)
    
      console.log(data)
      
    }
    fetchData()
  }, [props.city,props]);

  if (data !== null) {
    return (
      <>
        <section >
        
          <Link to='/settings'>
          <Tippy content={<span>Settings</span>}>
            <img src={settingicon} alt="setting-icon" id='setting-icon' />
            </Tippy>
            </Link>
          
            
            <ToastContainer />
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
            <h1>{props.settings.temp==='c'?data.current.temp_c+'℃':data.current.temp_f+'°F'}</h1>
            <div>
              <p>{data.current.condition.text} , Wind speed :{props.settings.temp==='c'?data.current.wind_kph+" Km/h":data.current.wind_mph+"Mph/h"} , Humidity:{data.current.humidity}%</p></div>

          </div>



        <div id='down'>
          <div id='forcast'>
            <div className='forcast-selector'><p>Today</p></div>
          <div  className='days'>
            {
             

              data.forecast.forecastday[0].hour.map((e) =>Date.parse(data.current.last_updated) < Date.parse(e.time) ?(
        
                
                  
                  <div key={e.time}>
                    <p>{e.time.slice(11,13) >12?e.time.slice(11,16)+'PM':e.time.slice(11,16)+'AM'}</p>
                    <img src={e.condition.icon} alt="data" />
                    <p>{props.settings.temp==='c'?e.temp_c+'℃':e.temp_f+'°F'}</p>
                    <p>{e.condition.text}</p>
                  </div>
                
         
                   
             ):<span key={e.time}></span>)}
          </div>          
            
          <div className='forcast-selector'><p>Upcomming Days:</p></div>
          <div className='days'>

            {
             

              data.forecast.forecastday.map((e) =>e.date!==data.location.localtime.slice(0,10)?(
        
                
                  
                  <div key={e.time}>
                    <p>{getDayname(e.date)}</p>
                    <img src={e.day.condition.icon} alt="data" />
                    <p>{props.settings.temp==='c'?e.day.avgtemp_c+'℃':e.day.avgtemp_f+'°F'}</p>
                    <p>{e.day.condition.text}</p>
                  </div>
                
         
                   
             ):<span key={e.time}></span>)}
          </div>
          </div>
        
          <div id='search-box'>
          <Tippy content={<span>Your Location Weather</span>}>
            <img src={userLoc} alt="user location icon" id='user-loc-icon' onClick={getLoc} />
            </Tippy>
            <input type="text" placeholder='Search Another location' id='cityInput' onChange={(evt) => { evt.value = evt.target.value }} />
           
            <button onClick={() => { props.setCity(document.getElementById('cityInput').value) }}></button>
                </div>
                </div>
        </section>

      </>
    )
  } else {
    return (<div>Eror</div>)
  }

}
