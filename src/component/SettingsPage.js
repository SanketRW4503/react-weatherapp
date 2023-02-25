import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SettingsPage(props) {

    //storing setting data to object to pass it to "state" later... via props 
    let data = {
        temp: props.settings.temp,
        wind: 'km/h',
        bgimage: props.settings.bgimage,
        defaultcheck: props.settings.defaultcheck
    }

    // for checkbox status:to know wheather it is checked or unchecked
    let [cchecked, setChecked] = useState(data.defaultcheck);

    //storing checkbox checked unchecked status to data object (which is present at top)
    function onchangeTemp(e) {
        data.temp = e.target.value;
    }


    //this function shows all the background images that are present in our directory 
    function Loadimg() {
        let images = ['/daytime/overcast/img1.jpg', '/daytime/snow/img1.jpg', '/daytime/clear/img1.jpg', '/daytime/rain/img1.jpg', '/nighttime/overcast/img1.jpg', '/nighttime/snow/img1.jpg', '/nighttime/clear/img1.jpg', '/nighttime/rain/img1.jpg']
        if (cchecked !== true) {
            return (

                <div id='bg-main'>
                    <div>Select Mannually </div>
                    <div id='bgimage-container'>
                        {
                            images.map((e) => {
                                return <div key={e} className='bgimages'>
                                    <input type="radio" name="img" id={e} onClick={() => { data.bgimage = e; }} />
                                    <img src={e} alt="" width={180} height={140} />
                                </div>

                            })
                        }
                    </div>
                </div>
            )
        }
    }




    // it sends the data object to the setting-state (which is present in a app.js) via props
    function sub() {

        if (data.bgimage !== null) {
            data.defaultcheck = false;
            //storing users choice bg-image to local storeage to display it again when user come to site
            localStorage.setItem('bgimage', data.bgimage)

        }
        if (cchecked === true) {
            data.defaultcheck = true;
            data.bgimage = null;
            //removing users choice bg-image if user dont want to choose any bg image 
            localStorage.removeItem('bgimage')
        }

        //storing user choice temparature unit to local storeage , so whenever user will come back it will show users choice temp unit
        localStorage.setItem('temp', data.temp);
        props.setSettings(data)
        toast.success('Changes Saved !');

    }

    useEffect(() => {

        // when page will load it will update the user choice temparature unit
        if (data.temp === 'c') {
            document.getElementById('c').checked = true;
            document.getElementById('f').checked = false;


        } else {
            document.getElementById('c').checked = false;

            document.getElementById('f').checked = true;

        }

    });

    return (

        <section>
            <Link id='backBTN' to='/'>&#8592;</Link>
            <div id='setting-container'>

                <div onChange={(e) => { onchangeTemp(e) }}>
                    <label htmlFor="">Temparature Units:</label>
                    <input type="radio" value='c' name='temp' id='c' />&#8451;
                    <input type="radio" value='f' name='temp' id='f' />°F
                </div>


                <div>
                    <input type="checkbox" defaultChecked={cchecked} id='checker' onChange={(e) => { e.target.checked ? setChecked(true) : setChecked(false); }} />Default Background Image Change.
                    <small> (it will change image according to weather)</small>
                </div>

                {/* it call an function which loads all the bg images */}
                <Loadimg />

                <button onClick={sub} id='saveBTN'>Save</button>


            </div>

            {/* shows toast message to user */}
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
                theme="dark"
                color='black' />

        </section>
    )
}
