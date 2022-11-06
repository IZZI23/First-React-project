import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";

function Covid() {
  const [covid, setCovid] = useState({});
  const [search, setSearch] = useState("Azerbaijan");
  const [activeTab, setActiveTab] = useState("Cases");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d83053e760mshbf7dc3718659598p1e1736jsn6ad31b0fb74d",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  const getCovid = async (search) => {
    const response = await fetch(
      `https://covid-193.p.rapidapi.com/statistics?country=${search}`,
      options
    );
    const data = await response.json();
    if (data) {
      for (
        let i = 0;
        i < Object.keys(data["response"][0]["cases"]).length;
        i++
      ) {
        if (
          data["response"][0]["cases"][
            Object.keys(data["response"][0]["cases"])[i]
          ] === null
        ) {
          data["response"][0]["cases"][
            Object.keys(data["response"][0]["cases"])[i]
          ] = "Unknown";
        }
      }

      for (
        let i = 0;
        i < Object.keys(data["response"][0]["deaths"]).length;
        i++
      ) {
        if (
          data["response"][0]["deaths"][
            Object.keys(data["response"][0]["deaths"])[i]
          ] === null
        ) {
          data["response"][0]["deaths"][
            Object.keys(data["response"][0]["deaths"])[i]
          ] = "Unknown";
        }
      }

      for (
        let i = 0;
        i < Object.keys(data["response"][0]["tests"]).length;
        i++
      ) {
        if (
          data["response"][0]["tests"][
            Object.keys(data["response"][0]["tests"])[i]
          ] === null
        ) {
          data["response"][0]["tests"][
            Object.keys(data["response"][0]["tests"])[i]
          ] = "Unknown";
        }
      }

      setCovid(data);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      getCovid(search);
    }
  }, [search]);

  return (
    <CovidMain>
      <h1>Covid Information</h1>
      <Search search = {search} setSearch= {setSearch}/>

      {"parameters" in covid ? (
        <>
          {covid.response.map((a) => { 
            return (
              <div key={a}>
                <Top>
                  <h2>{a.country}</h2>
                  <p>{a.continent}</p>
                  <p>Population: {a.population.toLocaleString("en-US")}</p>
                </Top>
                <Buttons>
                  <Button
                    className={activeTab === "Cases" ? "active" : ""}
                    onClick={() => setActiveTab("Cases")}
                  >
                    Cases
                  </Button>
                  <Button
                    className={activeTab === "Deaths" ? "active" : ""}
                    onClick={() => setActiveTab("Deaths")}
                  >
                    Deaths
                  </Button>
                  <Button
                    className={activeTab === "Tests" ? "active" : ""}
                    onClick={() => setActiveTab("Tests")}
                  >
                    Tests
                  </Button>
                </Buttons>

                {activeTab === "Cases" && (
                  <Info>
                    <p>New Cases: {a.cases.new.toLocaleString("en-US")}</p>
                    <p>Active: {a.cases.active.toLocaleString("en-US")}</p>
                    <p>Critical: {a.cases.critical.toLocaleString("en-US")}</p>
                    <p>
                      Recovered: {a.cases.recovered.toLocaleString("en-US")}
                    </p>

                    <p>Total Cases: {a.cases.total.toLocaleString("en-US")}</p>
                  </Info>
                )}
                {activeTab === "Deaths" && (
                  <Info>
                    <p>New: {a.deaths.new.toLocaleString("en-US")}</p>
                    <p>Critical: {a.cases.critical.toLocaleString("en-US")}</p>
                    <p>Total Deaths: {a.deaths.total.toLocaleString("en-US")}</p>
                  </Info>
                )}
                {activeTab === "Tests" && (
                  <Info>
                    <p>Total Tests Done: {a.tests.total.toLocaleString("en-US")}</p>
                    <p>Total Cases: {a.cases.total.toLocaleString("en-US")}</p>
                    <p>Total Deaths: {a.deaths.total.toLocaleString("en-US")}</p>
                  </Info>
                )}

                <Bottom>
                  <p>Date: {a.day}</p>
                </Bottom>
              </div>
            );
          })}
        </>
      ) : (
        <NoInfo>
          <p>City Dosen't Exist</p>
        </NoInfo>
      )}
    </CovidMain>
  );
}

const CovidMain = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
  height: 180vh;
  min-width: 100vw;
  background-image: url("https://violenceagainstchildren.un.org/sites/violenceagainstchildren.un.org/files/2020/images/coronavirus-covid-19-1024x754.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  box-shadow: inset 8rem 5rem 15rem #000000, inset -8rem -10rem 15rem #000000;
  h1 {
    padding-top: 1rem;
  }
  .active {
    background: linear-gradient(180deg, #494949, #9f9b51);
    color: white;
  }
`;



const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fbee86;
`;

const Buttons = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const Button = styled.button`
  width: 8rem;
  height: 3rem;
  padding: 1rem 0.5rem;
  color: #ffffff;
  background: #854e4e;
  border: 0.15rem solid black;
  font-weight: 600;
  border-radius: 0.3rem;
  margin-top: 5rem;
  &:hover {
    cursor: pointer;
    background-color: #9f9b51;
  }
`;

const Info = styled.div`
  padding-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #fbee86;
`;

const Bottom = styled.div`
  position: absolute;
  bottom: -60rem;
  left: 85rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 2rem;
`;

const NoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

export default Covid;
