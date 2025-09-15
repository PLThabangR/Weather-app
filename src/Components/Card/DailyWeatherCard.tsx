
interface dailyWeatherCardProps {
  date_txt: string;
  temp: number;
  city: string;
  country: string;
  description: string;
  windSpeed: number;
  humidity: number;
  icon: string;
 
}
//Destructuring the props
const DailyWeatherCard = ({date_txt,temp,city,description,country,windSpeed,humidity,icon}:dailyWeatherCardProps) => {
  return (
    <>
    <div className="card bg-base text-100 w-full md:w-64 xl:64 sm:w-96 align-middle shadow-sm mt-5">
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
      
      <div className="badge badge-outline">{date_txt}</div>
    </div>
  </div>
</div>
    
    </>
  )
}

export default DailyWeatherCard