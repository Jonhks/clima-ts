import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/data";
import classes from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

const Form = ({ fetchWeather }: FormProps) => {
  const [alert, setAlert] = useState("");
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      setTimeout(() => setAlert(""), 1500);
      return;
    }
    fetchWeather(search);
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <div className={classes.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="country">Pais:</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map((country) => (
            <option
              value={country.code}
              key={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {alert && <Alert>{alert}</Alert>}

      <input
        type="submit"
        value="Consultar Clima"
        className={classes.submit}
      />
    </form>
  );
};

export default Form;
