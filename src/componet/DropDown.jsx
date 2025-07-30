import { useEffect, useState } from "react";




const API_co="https://crio-location-selector.onrender.com/countries"

const DropDown=()=>
{

    const [allcountry,setAllCountry]=useState([]);
    const [country,setCountry]=useState([]);
    const [city,setCity]=useState([]);
    const [countryOp,setCountryOp]=useState("");
    const [stateOp,setStateOp]=useState("");
    const [cityOp,setCityOp]=useState("");

    useEffect(()=>{
        fetch(API_co)
        .then((res)=>res.json())
        .then(res=>setAllCountry(res))
        .catch(err=>console.log("error occured in fetching country: ",err))
    },[])

    const handleChangeC=(e)=>{
        setCountryOp(e.target.value);
        fetch(`https://crio-location-selector.onrender.com/country=${e.target.value}/states`)
        .then(res=>res.json())
        .then(res=>setCountry(res))
        .catch(err=>console.log("Error in fetching individual country: ",err))
    }
    
    const hanldeState=(e)=>{
        setStateOp(e.target.value);
        fetch(`https://crio-location-selector.onrender.com/country=${countryOp}/state=${e.target.value}/cities`)
        .then((res)=>res.json())
        .then(res=>setCity(res))
        .catch(err=>console.log("Error in fetching city: ",err))
    }
   return(
      <div
      style={{
        display:"flex",
        gap:"20px",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
      }}
      >
        <h1>Select Location</h1>
        <div 
        style={{
            display:"Flex",
            gap:"20px"
        }}
        >
         <select
          name="contries" 
          id="conties" 
          style={{
            height:"30px",
            fontSize:"1rem"
        }}
         onChange={handleChangeC}
          >
            <option value="Select Country">Select Country</option>
            {allcountry.map((item)=>(
                <option key={item} value={item}>{item}</option>
            ))}
         </select>
         <select
          name="city" 
          id="city" 
          disabled={`${country}`?false:true} 
          style={{height:"30px",fontSize:"1rem"}}
          onChange={hanldeState}
          >
            <option value="Select State">Select State</option>
            {country.map((item)=>(
            <option key={item} value={item}>{item}</option>
            ))}

         </select>
         <select name="town" id="town" style={{
            height:"30px",
            fontSize:"1rem"
        }}
        disabled={`${city}`?false:true}
        onChange={(e)=>setCityOp(e.target.value)}
        >
            <option value="Select City">Select City</option>
          {city.map((item)=>(
            <option  key={item} value={item}>{item}</option>
          ))}
         </select>
        </div>
        {countryOp&&cityOp&&stateOp&&
        <h2>You selected <strong style={{fontSize:"2rem"}}>{cityOp},</strong> <span style={{color:"grey"}}>{stateOp}, {countryOp}</span></h2>
        }
      </div>
   ) 
}

export default DropDown;