import { format, fromUnixTime } from 'date-fns'
import { WeatherDetailsProps } from '../types/WeatherAppTypes';
import { WeatherDetailsStyled } from '../style/WeatherDetails.style'
import { convertTempToCel } from '../common/functions';

function WeatherDetails({ weatherDetails } : WeatherDetailsProps) {
  const { list } = weatherDetails;
  const filterWeather = list.filter((item) => format(fromUnixTime(item.dt), 'HH') === '14');

  return (
      <>
        {filterWeather.map(({dt, weather, main}) => {
          const { temp, pressure, humidity } = main;
          const [ weatherDescription ] = weather
          return (
            <WeatherDetailsStyled key={dt}>
              <div className="weather__date">
                <span>{format(fromUnixTime(dt), 'EEEE')}</span>
                <span>{format(fromUnixTime(dt), 'dd/MM/yyy')}</span>
              </div>
              <div className="weather__content">
                <div>
                  <i className="wi wi-thermometer"></i>
                  {convertTempToCel(temp)}
                </div>
                <div>
                  <i className="wi wi-barometer"></i>
                  {pressure} hPa
                </div>
                <div>
                  <i className="wi wi-humidity"></i>
                  {humidity}%
                </div>
                <div className="weather__description">
                  {weatherDescription.main} / {weatherDescription.description}
                </div>
              </div>
            </WeatherDetailsStyled>
          )
        })}
      </>
    );
  }

export default WeatherDetails;