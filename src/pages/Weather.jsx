import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../components/Search";

function Weather() {
  const [search, setSearch] = useState("Baku");
  const [weather, setWeather] = useState({});

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d83053e760mshbf7dc3718659598p1e1736jsn6ad31b0fb74d",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const getWeather = async (search) => {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${search}&days=3`,
      options
    );
    const data = await response.json();
    if (data) {
      setWeather(data);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      getWeather(search);
    }
  }, [search]);

  return (
    <WeatherDiv>
      <h1>Weather Forecast</h1>
      <h2>Enter City Name</h2>
        <Search search = {search} setSearch={setSearch} />
      {"location" in weather ? (
        <>
          <Country>
            <h3>{weather.location.country}</h3>
            <h2>{weather.location.name}</h2>
            <h3>{weather.location.tz_id}</h3>
          </Country>
          <Currently>
            <p>{weather.current.condition.text}</p>
            <h3>{weather.current.temp_c} C°</h3>
            <img src={weather.current.condition.icon} alt="" />
          </Currently>
          <TimeZone>
            <p>
              Feels Like: <span>{weather.current.feelslike_c} C°</span>
            </p>
            <p>
              Local Time: <span>{weather.location.localtime}</span>
            </p>
            <p>
              Last Update:<span>{weather.current.last_updated}</span>
            </p>
            <p>
              Wind Speed: <span>{weather.current.wind_kph} km/h</span>
            </p>
            <p>
              Humidity: <span>{weather.current.humidity} %</span>
            </p>
          </TimeZone>
        </>
      ) : (
        <NoInfo>
          <p>City Dosen't Exist</p>
        </NoInfo>
      )}
    </WeatherDiv>
  );
}



const WeatherDiv = styled.div`
  max-width: 100vw;
  min-height: 140vh;
  background: linear-gradient(45deg, #2e81e0, #7988f3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    padding-top: 0.5rem;
  }
  h2{
    margin: 1rem;
  }
`;

const Country = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  line-height: 1rem;
  letter-spacing: 0.1rem;
  font-size: 1.5rem;
`;

const TimeZone = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  font-size: 2rem;
  span {
    margin: 2rem;
  }
`;

const Currently = styled.div`
  width: 100%;
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2rem;
`;

const NoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;
export default Weather;
