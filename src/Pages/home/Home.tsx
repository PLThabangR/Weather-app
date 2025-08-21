
import Navbar from '../Navbar/Navbar'
import { useEffect, useState } from 'react'
//importing the reducer function
import {  useWeather } from '../../globalState/Weather'
import type { WeatherState } from '../../globalState/Weather'
import toast from 'react-hot-toast';
//importing the type
//import type { WeatherState } from '../../globalState/Weather'

//We are defininng the initial state

const Home = () => {
    //Now we are using our use reducer hook
    const { state, dispatch } = useWeather();

    //sate for units
    const [units, setUnits] = useState(true);

    //set state for loading
    const [loading, setLoading] = useState(false);
    //bg-[#443C6C] 

    //Now we are destructuring the state values
   const { temp, city, country, icon, description } = state;

   const  updateWeather = async () =>{
    //Creating a type for the user location
    type  Position = {coords: {latitude: number, longitude: number}}
    //get user location
    //the type is geolocation position
    const userLocation : Position = await new Promise<GeolocationPosition>((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject));

    //api keys 
    const apiKeys = '5b766420a058e6257ae52a9165e9250c';
    setLoading(true);
    //Declare a variable to hold tehe response type Response
     let response: Response;

    if(units){
         //fetching the data from the api celsius units
         //For temperature in Celsius use units=metric this is from the open weather documentation
  response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&units=metric&lang=en&appid=${apiKeys}`);
    }else{
         //fetching the data from the api fahrenheit units measurements
         //For temperature in Fahrenheit use units=imperial opne waether documentation
     response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=imperial`);
    }


    //if the response is not ok throw an error
    if(!response.ok){
        setLoading(false);
         throw new Error("Network response was not ok");
        //notify user for the error with a custom toast with tailwind

      toast.custom(()=>{
            return (
                <div className="toast toast-end">
                    <div className="alert alert-info">
                        <span>Network response was not ok</span>
                    </div>
                </div>
            )
        })
        }

    // for daily this will be displayed on a card
//   const dailyResponse =  await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=metric`);


    if(response.ok){
        //converting the data to json
        setLoading(false);
    const data = await response.json();
    console.log("Data from opn weather ",data);

   //creating my unique weather object
    const newWeatherData: WeatherState = {
        id: data.id,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        //safety check if icnon is not empty
        icon:data.weather.length>0? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`:"",

        description:data.weather.length>0?  data.weather[0].description:""
    }

    console.log("My new weather data",newWeatherData);
    //dispatching the data to the reducer
    dispatch({ type: "SET_WEATHER", payload: newWeatherData });
    }
    
    
//dispatch({ type: "SET_WEATHER", payload: { temp: 23, city: "New York", country: "USA", icon: "https://openweathermap.org/img/wn/10d@2x.png", description: "Cloudy" } })

   }

   useEffect(() => {
       updateWeather();
   }, [])
  return (

    <div data-theme="light">
<div className='h-screen w-5/6 container mx-auto' >
        <Navbar/>
                 <h1>Temperature: {temp}°C</h1>
                <h1>City: {city}</h1>
                <h1>Country: {country}</h1>
                <h1>Icon: {icon}</h1>
                <h1>Description: {description}</h1> 
{/* is loading */}
     
       
       {loading && <span className="loading loading-spinner text-primary"></span>}
        <button className="btn btn-primary" onClick={() => updateWeather()}>Primary</button>

    </div>
    </div>
    
  )
}

export default Home