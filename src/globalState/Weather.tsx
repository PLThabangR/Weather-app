//Creating a structure to use a reducer

import { useReducer } from "react";

// initial state type
 type WeatherState= {
    id: number;
    temp: number;
    humidity: number;
    windSpeed: number;

    city: string;
    country: string;
    icon: string;
    description: string;
};

// type for action
 interface WeatherAction {
    type: "SET_WEATHER"; 
    payload: {
        id: number;
        temp: number;
         humidity: number;
    windSpeed: number;
        city: string;
        country: string;
        icon: string;
        description: string;
    };
};

//export type WeatherAction = WeatherFunction;

//initial state
 const initialState: WeatherState = {
    id: 0,
    temp: 0,
    humidity:0,
    windSpeed:0,
    city: "",
    country: "",
    icon: "",
    description: "",
};
 export const useWeather = () => {
//     // useReducer takes a reducer function and an initial state

     //state and dispatch are use update the state 
    const [state, dispatch] = useReducer(weatherReducer, initialState); 
    return { state, dispatch };

console.log("This is th data from ourstate",state)
};

//this is our reducer function to update the state
export const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        //set state
        case "SET_WEATHER":
            return {
                //
                id: action.payload.id,
                temp: action.payload.temp,
                city: action.payload.city,
                country: action.payload.country,
                icon: action.payload.icon,
                description: action.payload.description,
            };
            
        default:
            // return the current state
            return state;
    }
};

