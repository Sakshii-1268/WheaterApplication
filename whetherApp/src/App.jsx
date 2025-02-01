import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [wDetails, setWdetails] = useState();
  let [isLoading, setisLoading] = useState(false);

  let getData = (event) => {
    setisLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=751d66e130befad396405dc13796a57c`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
        setisLoading(false);
      });

    event.preventDefault();
    setCity("");
  };

  return (
    <>
      <div className="App">
        <div className="section-heading">
          <h1 className="heading">Simple weather App</h1>
          <form onSubmit={getData}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City Name"
            />
            <button type="submit">submit</button>
          </form>
        </div>
        <div className="Container">
          <img
            src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952c6lxwl05p70dg1kc223wkgval0hj0rchw1odigz8&ep=v1_gifs_search&rid=200w.gif&ct=g"
            width={100}
            className={`gif ${isLoading ? " " : "show"}`}
          />
          {wDetails !== undefined ? (
            <>
              <h3>
                {wDetails.name} <span>{wDetails.sys.country}</span>
              </h3>
              <h2 className="h2-two">{wDetails.main.temp}</h2>
              <img
                className="img"
                src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
              />
              <p>{wDetails.weather[0].description}</p>
            </>
          ) : (
            "no city FOund"
          )}
        </div>
      </div>
    </>
  );
}

export default App;
