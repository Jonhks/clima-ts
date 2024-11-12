export const formatTemperature = (temperature: number): number =>
  parseInt((temperature - 273.15).toString());
