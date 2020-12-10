import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Coin from "./Coin";
import Header from "./components/Header";

export default function App() {
  const [coins, setCoin] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoin(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  function mudaCor() {
    const cor = document.getElementById("fundo");
    if (cor.style.backgroundColor === "gray") {
      cor.style.backgroundColor = "#1a1a1c";
    } else {
      cor.style.backgroundColor = "#1a1a1c" ? "gray" : "red";
    }
  }

  return (
    <div className="coin-app">
      <div className="coin-search">
        <button onClick={mudaCor}>Dark Mode</button>
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <Header />
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            porcentageChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}
