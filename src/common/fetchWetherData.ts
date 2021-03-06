import { useState, useEffect } from 'react';
import axios from 'axios';
import { TDataProps } from '../types/WeatherAppTypes';
import { initData } from './initDataState';
 
export const useWeatherApi = (city : string) => {
  const [data, setData] = useState<TDataProps>(initData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(apiUrl);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [city, apiUrl]);

  const dataReturn = {
    data,
    isLoading,
    isError,
  };

  return dataReturn;
};
