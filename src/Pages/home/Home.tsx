
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react'
//importing the reducer function
import {  useWeather } from '../../globalState/Weather'
import type { WeatherState } from '../../globalState/Weather'
import toast from 'react-hot-toast';

//import css
import "./home.css"
import DailyWeatherCard from '../../Components/Card/DailyWeatherCard';
//importing the type
//import type { WeatherState } from '../../globalState/Weather'

interface DailyWeather{
    date_txt: string,
    clouds: string,
    temp: number,
    city: string,
    description: string,
    windSpeed: number,
    humidity: number,
    icon: string
}


const Home = () => {
    //Now we are using our use reducer hook
    const { state, dispatch } = useWeather();
    //state for theme
    const [isTheme, setIsTheme] = useState(false);
    //date satte
 const [currentDate] = useState(new Date());
    //sate for units to true by default as celcius
    const [units, setUnits] = useState(true);

    //set state for loading
    const [loading, setLoading] = useState(false);
    //state for storing daily data
    const [dailyData,setDailyData]= useState([])


    //Now we are destructuring the state values
   const { temp, city, country, icon, description, humidity, windSpeed} = state;

   //function to change the theme
   const changeYourTheme = () => { 
     setIsTheme(!isTheme);
     
       toast.custom(()=>{ //start of toast
            return (
                <div className="toast toast-end">
                    <div  className="alert alert-success">
                        <span>{isTheme? "Light":"Dark"}</span>
                    </div>
                </div>
            )
        })//end of toast
    
   }

   const changeYourUnits = () => {
       setUnits(!units);
         toast.custom(()=>{ //start of toast
            return (
                <div className="toast toast-end">
                    <div className="alert alert-success">
                        <span>{units? "Celsius":"Fahrenheit"}</span>
                    </div>
                </div>
            )
        })//end of toast
   }
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
    
     //By defualt it will be in celsius 
    if(units){
         //fetching the data from the api celsius units
         //For temperature in Celsius use units=metric this is from the open weather documentation
  response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&units=metric&lang=en&appid=${apiKeys}`);

  //data for daily with metrics units
  let dailyDataResponse =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=metric`);
     
  const dailyData = await dailyDataResponse.json();
  //Set this data inside the array
  
   setDailyData(dailyData.list)
   console.log("dailyDataResponse with celsius",dailyData.list)
    }else{
         //fetching the data from the api fahrenheit units measurements
         //For temperature in Fahrenheit use units=imperial opne waether documentation
     response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=imperial`);

      //data for daily in fehrenheit
  let   dailyDataResponse =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=imperial`);
        //set this data inside array

        const dailyData = await dailyDataResponse.json();
  //Set this data inside the array
   setDailyData(dailyData.list)
   console.log("dailyDataResponse with fahrenheit",dailyData.list)
 
    }


    //if the response is not ok throw an error
    if(!response.ok){
        setLoading(false);
        //Shoot a toast for error
        //notify user for the error with a custom toast with tailwind
      toast.custom(()=>{ //start of toast
            return (
                <div className="toast toast-end">
                    <div className="alert alert-error">
                        <span>Network response was not ok</span>
                    </div>
                </div>
            )
        })//end of toast
        }

    // for daily this will be displayed on a card
//   const dailyResponse =  await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&appid=${apiKeys}&units=metric`);
        //set dat

    if(response.ok){
        //converting the data to json
        setLoading(false);
        //notify user for the succes with a custom toast with tailwind
            toast.custom(()=>{ //start of toast
            return (
                <div className="toast toast-end">
                    <div role="alert" className="alert alert-success">
                        <span>Data fetched successfully</span>
                    </div>
                </div>
            )
        })//end of toast
    const data = await response.json();
  

   //creating my unique weather object
    const newWeatherData: WeatherState = {
        id: data.id,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        city: data.name,
        country: data.sys.country,
        //safety check if icnon is not empty since is an array
        icon:data.weather.length>0? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`:"",

        description:data.weather.length>0?  data.weather[0].description:"",
       
    }

  
    //dispatching the data to the reducer 
    dispatch({ type: "SET_WEATHER", payload: newWeatherData });
    }
    
     }//end of update weather function

//function to display daily weather


   //reload when units are changed
   useEffect(() => {
     updateWeather();
     console.log(dailyData);
   }, [units,
   ])

   //loading when app loads
    useEffect(() => {
     updateWeather();
   }, [])
  return (

    <div data-theme={isTheme ? "dark" : "light"}  className='home-container'>
        <Navbar changeYourUnits={changeYourUnits}  changeYourTheme={changeYourTheme}/>
<div  className='h-screen  w-full  md:w-auto  sm:w-full container p-5 flex flex-col items-center ' >
        
           <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl m-5 ">Weather today</h1>        
              
{/* is loading */}
     
  

{
    state.temp &&
   (
    
    <div className="card bg-base text-100 w-96 align-middle shadow-sm mt-5">
  <figure>
    <img
    src={icon}
      alt="icon" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {city}
      <div className="badge badge-secondary">{country}</div>

    </h2>
     <h1 className="card-title">{temp}</h1>
     <h1 className="card-title">{description}</h1>
     <h1 className="card-title">Wind Speed : {windSpeed}</h1>
     <h1 className="card-title">Humidity : {humidity}</h1>
   
    <div className="card-actions justify-end">
      
      <div className="badge badge-outline">{currentDate.toDateString()}</div>
    </div>
  </div>
</div>
)
}
       
       {loading && <span className="loading loading-spinner text-primary"></span>}

        {/* Display daily weatheron the card */}
      <div className='flex col flex-wrap justify-center gap-5  md:flex-row xl:flex-row'>
          { dailyData?.length > 0 && dailyData.map((item: any, index: number) => <DailyWeatherCard key={index} icon={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} date_txt={item.dt_txt}  temp={item.main.temp} city={item.main.city} description={item.weather[0].description} windSpeed={item.wind.speed} humidity={item.main.humidity}  />) } 
      </div>

    </div>
    </div>
    
  )
}

export default Home