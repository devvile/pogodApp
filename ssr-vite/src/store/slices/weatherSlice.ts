import { createSlice } from "@reduxjs/toolkit";
import type { ComparisonCity, CurrentWeather } from "../../types";


interface WeatherState{
    current:CurrentWeather,
    comparison: ComparisonCity[]
}

const initialState : WeatherState = {
    current: {
      city: "New York",
      country: "USA",
      temperature: 24,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      icon: "partly-cloudy"
    },
    comparison: [
      {
        city: "London",
        country: "UK",
        temperature: 18,
        condition: "Rainy",
        icon: "rainy"
      },
      {
        city: "Tokyo",
        country: "Japan",
        temperature: 28,
        condition: "Sunny",
        icon: "sunny"
      },
      {
        city: "Sydney",
        country: "Australia",
        temperature: 22,
        condition: "Cloudy",
        icon: "cloudy"
      },
      {
        city: "Mumbai",
        country: "India",
        temperature: 32,
        condition: "Thunderstorm",
        icon: "thunderstorm"
      },
      {
        city: "Moscow",
        country: "Russia",
        temperature: -2,
        condition: "Snow",
        icon: "snow"
      }
    ]
  };

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers:{
        
    }
})

export default weatherSlice.reducer