import { WeatherType } from "../../hooks/useWeather";
import { formatTemperature } from "../../utils/app";
import classes from "./WeatherDetail..module.css";

type WeatherPropsDetail = {
  weather: WeatherType;
};

const WeatherDetail = ({ weather }: WeatherPropsDetail) => {
  return (
    <div className={classes.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={classes.current}>
        {formatTemperature(weather.main.temp)}&deg;
      </p>
      <div className={classes.temperatures}>
        <p>
          Min: <span>{formatTemperature(weather.main.temp_min)}&deg;</span>
        </p>
        <p>
          Max: <span>{formatTemperature(weather.main.temp_max)}&deg;</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDetail;
