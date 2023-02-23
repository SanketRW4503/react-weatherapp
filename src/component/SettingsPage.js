import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SettingsPage(props) {



    let data ={ temp:'c',
    wind:'km/h',
    wfdays:5}



function onchangeTemp(e){
    console.log(props.settings)

   data.temp=e.target.value;
}

function sub(){
  
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
   
useEffect(()=>{


 if(props.settings.temp==='c'){
       document.getElementById('c').checked=true;
          document.getElementById('f').checked=false;


 }else{
    document.getElementById('c').checked=false;

    document.getElementById('f').checked=true;

 }
    
})

    return (

        <section>
            <Link id='backBTN' to='/'>&#8592;</Link>
            <table>
                <tbody>
              
                <tr>
                    <td>Temparature:</td>
                    <td onChange={onchangeTemp} >
                        <input type="radio" value='c' name='temp' id='c'  />&#8451;
                        <input type="radio" value='f'name='temp' id='f' />°F

                    </td>
                </tr>
                <tr>
                    <td>Weather Forcast Days</td>
                    <td>
                        <select name="" id="">
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                        </select>

                    </td>
                </tr>

                <tr>
                    <td>         <button onClick={sub} id='saveBTN'>Save</button></td>
           
                </tr>
                </tbody>
            </table>
            <ToastContainer />

        </section>
    )
}
