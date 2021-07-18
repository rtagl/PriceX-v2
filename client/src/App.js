import { useEffect, useState } from "react";
import SelectCoin from "./components/SelectCoin";
import CoinListView from "./components/CoinListView";
import axios from "axios";

const url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_NOMIC_KEY}`;

const App = () => {
  const [coins, setCoins] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState({});

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data.slice(0, 21));
    });
  }, []);

  console.log(selectedCoin);

  const handleSelectChange = (e) => {
    const coinName = e.target.value;
    setSelectedCoin(coins.find((coin) => coin.name === coinName));
  };

  return (
    <div className="container">
      <div className="box">
        <SelectCoin coins={coins} selectedCoin={selectedCoin} handleChange={handleSelectChange} />
      </div>
      <div>
        <CoinListView coins={coins} />
      </div>
    </div>
  );
};

export default App;
