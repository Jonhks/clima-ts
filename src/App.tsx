import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Loader from "./components/Loader/Loader";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail.";
import { useWeather } from "./hooks/useWeather";

const App = () => {
  const { fetchWeather, weather, hasWeatherData, loading, notFound } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Loader />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && (
          <div className="container">
            <Alert>Ciudad no encontrada</Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
