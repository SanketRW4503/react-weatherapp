import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SettingsPage(props) {

    let data = {
        temp: 'c',
        wind: 'km/h',
        wfdays: 5,
        bgimage:props.settings.bgimage,
        defaultcheck:true
    }


    let [cchecked, setChecked] = useState(props.settings.defaultcheck);


    function onchangeTemp(e) {

        data.temp = e.target.value;
    }







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
                                    <input type="radio" name="img"  onClick={()=>{data.bgimage=e; data.defaultcheck=false}} />
                                    <img src={e} alt="" width={180} height={140} />
                                </div>

                            })
                        }
                    </div>
                </div>
            )




        }



    }


    function sub() {

        props.setSettings(data)
        toast.success('Changes Saved !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    useEffect(() => {


        if (props.settings.temp === 'c') {
            document.getElementById('c').checked = true;
            document.getElementById('f').checked = false;


        } else {
            document.getElementById('c').checked = false;

            document.getElementById('f').checked = true;

        }

    })

    return (

        <section>
            <Link id='backBTN' to='/'>&#8592;</Link>
            <div id='setting-container'>


                <div onChange={(e)=>{onchangeTemp(e)}}>
                <label htmlFor="">Temparature Units:</label>
                <input type="radio" value='c' name='temp' id='c' />&#8451;
                <input type="radio" value='f' name='temp' id='f' />°F

                </div>
                <div>
                <input type="checkbox" defaultChecked={cchecked} id='checker' onChange={(e) => { e.target.checked ? setChecked(true) : setChecked(false) }} />Default Background Image Change.
                <small> (it will change image according to weather)</small>
                </div>

                <Loadimg />

                <button onClick={sub} id='saveBTN'>Save</button>


            </div>

            <ToastContainer />

        </section>
    )
}
