import { useState, useEffect } from 'react';
import axios from 'axios';
 
export const useWeatherApi = (url : string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);

  const dataReturn = {
    data,
    isLoading,
    isError,
  };

  return dataReturn;
};
