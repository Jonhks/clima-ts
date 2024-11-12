import { useMemo, useState } from "react";
import axios from "axios";
import {
  SearchType,
  // WeatherType
} from "../types";
import { z } from "zod";

// //? Type Gards function
// const isWeatherResponse = (weather: unknown): weather is WeatherType => {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as WeatherType).name === "string" &&
//     typeof (weather as WeatherType).main.temp === "number" &&
//     typeof (weather as WeatherType).main.temp_max === "number" &&
//     typeof (weather as WeatherType).main.temp_min === "number"
//   );
// };

//? con zod

const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export type WeatherType = z.infer<typeof WeatherSchema>;

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [weather, setWeather] = useState<WeatherType>(initialState);

  const fetchWeather = async (seach: SearchType) => {
    setLoading(true);
    setWeather(initialState);
    setNotFound(false);
    try {
      const appId = import.meta.env.VITE_API_KEY;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${seach.city},${seach.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);
      if (!data[0]) {
        setNotFound(true);
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      //? Castear el type (no tan recomendado)
      // const { data: dataWeather } = await axios<WeatherType>(weatherUrl);
      // console.log(dataWeather.name);
      // console.log(dataWeather.main.temp_max);

      // //? Type Gards o Assertion
      // const { data: dataWeather } = await axios(weatherUrl);
      // const result = isWeatherResponse(dataWeather);
      // if (result) {
      //   console.log(dataWeather.main);
      // } else {
      //   console.log("algo fallo!!!! correeeeeeeeeeeeeeeeeeeeeeee");
      // }

      //? con zod
      const { data: dataWeather } = await axios(weatherUrl);
      //? este result almacena la respuesta formateada a como tenemos nuestro schemma
      const result = WeatherSchema.safeParse(dataWeather);

      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    fetchWeather,
    weather,
    hasWeatherData,
    loading,
    notFound,
  };
};
